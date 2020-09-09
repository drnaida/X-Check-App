const uuid = require('uuid');
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: String,
  title: String,
  category: String,
  items: [{
    id: String,
    description: String,
    minScore: Number,
    maxScore: Number,
    onlyForMentors: Boolean
  }]
}, { _id: false })

const taskSchema = new mongoose.Schema({
  id: String,
  title: String,
  author: String,
  categories: [String],
  requirements: [itemSchema]
});

taskSchema.statics.toResponse = task => {
  const {id, title, author, categories, requirements} = task;
  return {id, title, author, categories, requirements}
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;