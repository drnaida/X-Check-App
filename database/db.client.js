const mongoose = require('mongoose');
const {MONGO_CONNECTION_STRING} = require('../common/config');
const User = require('../resourses/users/user.model');

module.exports = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', () => {
    User.create({ githubId: 'admin', password: 'admin', roles: ['course-manager'] });
    console.log('We are connected');
    db.dropDatabase();
    callback();
  });
};