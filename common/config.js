const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.join(__dirname, '../.env')
});

module.exports = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_CONNECTION_STRING: process.env.MONGODB_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_REFRESH_TOKEN_SECRET_KEY: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    TOKEN_EXPIRES: process.env.TOKEN_EXPIRES,
    TOKEN_REFRESH_EXPIRES: process.env.TOKEN_REFRESH_EXPIRES,
    AUTH_MODE: process.env.AUTH_MODE === 'true'
};