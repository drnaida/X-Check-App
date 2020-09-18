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
    check('title', 'title is not passed').exists(),
    check('categories', 'categories is not passed').exists(),
    check('requirements', 'requirements is not passed').exists()
  ]
}

const reviewRequestBodyValidation = () => {
  return [
    check('task', 'task is not passed').exists(),
    check('linkOnPr', 'linkOnPr is not passed').exists(),
    check('linkOnTask', 'linkOnTask is not passed').exists(),
    check('developer', 'developer is not passed').exists()
  ]
}

module.exports = { loginBodyValidation, registerBodyValidation, taskBodyValidation, reviewRequestBodyValidation }