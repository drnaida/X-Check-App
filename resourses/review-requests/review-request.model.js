const mongoose = require('mongoose');

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
  examiner: [{
    id: String,
    comment: String
  }],
  categories: [String],
  requirements: [{
    id: String,
    title: String,
    category: String,
    items: [
      {
        id: String,
        description: String,
        score: Number,
        selfMark: Number,
        marks: [
          {
            examinerId: String,
            mark: Number,
            comment: String,
            dispute: {
              comment: String,
              id: String,
              state: {type: String, default: null},
              suggestedScore: Number
            }
          }
        ]
      }
    ]
  }]
});

reviewRequestSchema.statics.toResponse = reviewRequest => {
  const {id, student, pullRequestLink, deployLink, state, taskId, taskTitle, examiner, categories, requirements} = reviewRequest;
  return {id, student, pullRequestLink, deployLink, state, taskId, taskTitle, examiner, categories, requirements}
};

const ReviewRequest = mongoose.model('ReviewRequest', reviewRequestSchema);

module.exports = ReviewRequest;
