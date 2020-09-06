const router = require('express').Router();
const User = require('../users/user.model');
const loginService = require('./login.service');
const {FORBIDDEN, BAD_REQUEST, getStatusText} = require('http-status-codes');
const {JWT_SECRET_KEY, TOKEN_EXPIRES} = require('../../common/config');
const jwt = require('jsonwebtoken');
const {ErrorHandler} = require('../../helpers/errorHandler');
const {validationResult} = require('express-validator');
const {loginBodyValidation, registerBodyValidation} = require('../../validators/validator');
const catchErrors = require('../../helpers/catchErrors');

router.post(
  '/login',
  loginBodyValidation(),
  catchErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    }
    const user = await loginService.getUserByGithubId(req.body);
    if (!user) {
      throw new ErrorHandler(FORBIDDEN, getStatusText(FORBIDDEN));
    } else {
      const token = jwt.sign(
        {token: user.id, githubId: user.githubId},
        JWT_SECRET_KEY,
        {
          expiresIn: TOKEN_EXPIRES
        }
      );
      return await res.json({token, githubId: user.githubId, roles: user.roles});
    }
  })
);

router.post('/register', registerBodyValidation(), catchErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    }
    const candidate = await loginService.checkUser(req.body);
    if (candidate) {
      return res.status(BAD_REQUEST).json({ message: 'This githubId already exists' })
    } else {
      const newUser = new User(req.body);
      await loginService.addUser(newUser);
      await res.json(User.toResponse(newUser));
    }
  })
)

module.exports = router;