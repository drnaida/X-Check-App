const {check} = require('express-validator');

const loginBodyValidation = () => {
  return [
    check('githubId', 'login is not passed').exists(),
    check('password', 'password is not passed').exists()
  ];
};

const registerBodyValidation = () => {
  return [
    check('githubId', 'login is not passed').exists(),
    check('password', 'password is not passed').exists().isLength({ min: 6 }),
    check('roles', 'roles is not passed').exists()
  ];
};

const taskBodyValidation = () => {
  return [
    check('author', 'author is not passed').exists(),
    check('state', 'state is not passed').exists(),
    check('categoriesOrder', 'categoriesOrder is not passed').exists(),
    check('items', 'items is not passed').exists()
  ]
}

module.exports = { loginBodyValidation, registerBodyValidation, taskBodyValidation }