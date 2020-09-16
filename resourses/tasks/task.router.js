const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');
const catchErrors = require('../../helpers/catchErrors');
const { ErrorHandler } = require('../../helpers/errorHandler');
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');
const { taskBodyValidation } = require('../../validators/validator');
const { validationResult } = require('express-validator');

router.route('/').get(
  catchErrors(async (req, res) => {
    const tasks = await taskService.getAll();
    await res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const task = await taskService.getById(req.params.id);
    if (!task) {
      throw new ErrorHandler(
        NOT_FOUND,
        `Task with id ${req.params.id} not found`
      );
    } else {
      await res.json(Task.toResponse(task));
    }
  })
);

router.route('/').post(
  taskBodyValidation(),
  catchErrors(async (req, res) => {
    const errors = validationResult(req);
    const task = await taskService.getById(req.body.id);
    if (task) {
      throw new ErrorHandler(
        BAD_REQUEST,
        `Task with id ${req.body.id} already exists`
      )
    }
    if (!errors.isEmpty()) {
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    } else {
      const newTask = new Task(req.body);
      await taskService.createTask(newTask);
      await res.json(Task.toResponse(newTask));
    }
  })
)

router.route('/:id').put(
  taskBodyValidation(),
  catchErrors(async (req, res) => {
    const errors = validationResult(req);
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!errors.isEmpty() || !task) {
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    } else {
      await res.json(Task.toResponse(task));
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const deleteTask = await taskService.deleteTask(req.params.id);
    if (!deleteTask) {
      throw new ErrorHandler(
        NOT_FOUND,
        `Task with id ${req.params.id} not found`
      );
    } else {
      await res
        .status(OK)
        .json({ message: 'The task has been deleted' });
    }
  })
);

module.exports = router;