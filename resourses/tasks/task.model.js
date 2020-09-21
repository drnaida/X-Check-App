const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: String,
  title: String,
  category: String,
  items: [{
    id: String,
    description: String,
    score: Number,
    selfMark: Number,
    onlyForMentors: Boolean
  }]
}, { _id: false })

const taskSchema = new mongoose.Schema({
  id: String,
  title: String,
  author: String,
  deadline: String,
  state: String,
  categories: [String],
  requirements: [itemSchema]
});

taskSchema.statics.toResponse = task => {
  const {id, title, author, deadline, state, categories, requirements} = task;
  return {id, title, author, deadline, state, categories, requirements}
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;