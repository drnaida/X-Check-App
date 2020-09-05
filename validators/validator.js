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
    check('password', 'password is not passed').exists(),
    check('roles', 'roles is not passed').exists()
  ];
};

module.exports = { loginBodyValidation, registerBodyValidation }