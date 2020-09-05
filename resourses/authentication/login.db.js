const User = require('../users/user.model');

const getUserByGithubId = async githubId => await User.findOne({ githubId });

const addUser = async user => User.create(user);

module.exports = { getUserByGithubId, addUser };