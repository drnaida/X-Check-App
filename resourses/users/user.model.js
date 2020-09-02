const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  githubId: String,
  password: String,
  roles: [String]
});

userSchema.statics.toResponse = user => {
  const { id, githubId, roles } = user;
  return { id, githubId, roles };
};

userSchema.pre('save', async function encodePassword(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.statics.checkPassword = async (reqPassword, passwordFromDb) => {
  return bcrypt.compare(reqPassword, passwordFromDb);
};

const User = mongoose.model('User', userSchema);

module.exports = User;