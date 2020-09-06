const uuid = require('uuid');
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: String,
  minScore: Number,
  maxScore: Number,
  category: String,
  title: String,
  description: String
}, { _id: false })

const taskSchema = new mongoose.Schema({
  id: String,
  author: String,
  state: String,
  categoriesOrder: [String],
  items: [itemSchema]
});

taskSchema.statics.toResponse = task => {
  const {id, author, state, categoriesOrder, items} = task;
  return {id, author, state, categoriesOrder, items}
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;