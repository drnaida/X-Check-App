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
    check('deployLink', 'deployLink is not passed').exists(),
    check('student', 'student is not passed').exists(),
    check('pullRequestLink', 'pullRequestLink is not passed').exists(),
    check('taskId', 'taskId is not passed').exists(),
    check('taskTitle', 'taskTitle is not passed').exists()
  ]
}

module.exports = { loginBodyValidation, registerBodyValidation, taskBodyValidation, reviewRequestBodyValidation }
