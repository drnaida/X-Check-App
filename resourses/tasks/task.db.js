const Task = require('./task.model');

const getAll = async () => Task.find({});

const getById = async taskId => Task.findOne({id: taskId});

const getByTitle = async taskTitle => Task.findOne({title: taskTitle});

const createTask = async task => Task.create(task);

const updateTask = async taskToUpdate => (await Task.updateOne({ id: taskToUpdate.id }, taskToUpdate)).ok;

const deleteTask = async taskId => (await Task.deleteOne({ id: taskId })).ok;

module.exports = { getAll, getById, getByTitle, createTask, updateTask, deleteTask };
