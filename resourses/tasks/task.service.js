const taskRepo = require('./task.db');

const getAll = async () => taskRepo.getAll();

const getById = async taskId => taskRepo.getById(taskId);

const createTask = async task => taskRepo.createTask(task);

const updateTask = async (taskId, reqBody) => taskRepo.updateTask({ id: taskId, ...reqBody });

const deleteTask = async taskId => taskRepo.deleteTask(taskId);

module.exports = { getAll, getById, createTask, updateTask, deleteTask };

