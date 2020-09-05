const loginRepo = require('./login.db');
const User = require('../users/user.model');

const getUserByGithubId = async request => {
  const user = await loginRepo.getUserByGithubId(request.githubId);
  if (user) {
    const isPasswordsMatch = await User.checkPassword(
      request.password,
      user.password
    );
    return isPasswordsMatch ? user : undefined;
  }
};

const checkUser = async user => loginRepo.getUserByGithubId(user.githubId);

const addUser = async user => loginRepo.addUser(user);

module.exports = { getUserByGithubId, checkUser, addUser };