const express = require('express');
const app = express();
const { NOT_FOUND, getStatusText } = require('http-status-codes');

const { requestLoggerMiddleware } = require('./loggers/logger');
const checkToken = require('./resourses/authentication/jwt/checkToken');
const { handleError, handleInternalServerError, ErrorHandler } = require('./helpers/errorHandler');

const loginRouter = require('./resourses/authentication/login.router');
const userRouter = require('./resourses/users/user.router');
const taskRouter = require('./resourses/tasks/task.router');
const reviewRouter = require('./resourses/review-requests/review-request.router');
const PORT = process.env.PORT;

app.use(express.json({extended: true}));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build/'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use(requestLoggerMiddleware);

app.use('/auth', loginRouter);

app.use('/users', checkToken, userRouter);

app.use('/tasks', checkToken, taskRouter);

app.use('/review-requests', checkToken, reviewRouter);

app.use('/*', async (req, res, next) => {
  await res.status(NOT_FOUND).json({ message: getStatusText(NOT_FOUND) });
  next();
});

app.use((err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    return handleError(err, req, res);
  }
  next();
});

app.use((req, res) => {
  handleInternalServerError(req, res);
});

module.exports = app;
