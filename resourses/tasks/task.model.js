const mongoose = require('mongoose');
const uuid = require('uuid');

const itemSchema = new mongoose.Schema({
  id: String,
  title: String,
  category: String,
  items: [{
    id: String,
    description: String,
    score: Number,
    onlyForMentors: Boolean
  }]
}, { _id: false })

const taskSchema = new mongoose.Schema({
  id: String,
  key: {type: String, default: uuid.v1},
  title: String,
  author: String,
  deadline: String,
  state: String,
  categories: [String],
  requirements: [itemSchema]
});

taskSchema.statics.toResponse = task => {
  const {id, key, title, author, deadline, state, categories, requirements} = task;
  return {id, key, title, author, deadline, state, categories, requirements}
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;