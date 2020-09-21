const mongoose = require('mongoose');
const uuid = require('uuid');

const reviewRequestSchema = new mongoose.Schema({
  id: String,
  student: String,
  pullRequestLink: String,
  deployLink: String,
  state: {
    type: String,
    default: 'DRAFT'
  },
  taskId: String,
  taskTitle: String,
  categories: [String],
  requirements: [{
    id: String,
    title: String,
    category: String,
    items: [
      {
        id: {
          type:String,
          default: uuid.v1
        },
        description: String,
        score: Number,
        selfMark: Number,
        marks: [
          {
            examinerId: String,
            mark: Number,
            comment: String
          }
        ]
      }
    ]
  }]
});

reviewRequestSchema.statics.toResponse = reviewRequest => {
  const {id, student, pullRequestLink, deployLink, state, taskId, taskTitle, categories, requirements} = reviewRequest;
  return {id, student, pullRequestLink, deployLink, state, taskId, taskTitle, categories, requirements}
};

const ReviewRequest = mongoose.model('ReviewRequest', reviewRequestSchema);

module.exports = ReviewRequest;