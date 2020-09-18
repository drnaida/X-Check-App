const mongoose = require('mongoose');

const gradeItemSchema = new mongoose.Schema({
  description: String,
  maxScore: Number,
  score: Number,
  comment: String
})

const gradeSchema = new mongoose.Schema({
  categories: [{
    categoryTitle: String,
    items: [gradeItemSchema]
  }],
})

const selfGradeItemSchema = new mongoose.Schema({
  description: String,
  maxScore: Number,
  score: Number
})
const selfGradeSchema = new mongoose.Schema({
  categories: [{
    categoryTitle: String,
    items: [selfGradeItemSchema]
  }]
})

const reviewRequestSchema = new mongoose.Schema({
  id: String,
  linkOnTask: String,
  linkOnPr: String,
  crossCheckSessionId: {
    type: String,
    default: null
  },
  developer: {
    type: String,
    default: null
  },
  task: String,
  state: {
    type: String,
    default: 'DRAFT'
  },
  selfGrade: {
    type: [selfGradeSchema],
    default: undefined
  },
  grades: {
    type: [gradeSchema],
    default: undefined
  }
});

reviewRequestSchema.statics.toResponse = reviewRequest => {
  const {id, linkOnTask, linkOnPr, crossCheckSessionId, title, developer, task, state, selfGrade, grades} = reviewRequest;
  return {id, linkOnTask, linkOnPr, crossCheckSessionId, title, developer, task, state, selfGrade, grades}
};

const ReviewRequest = mongoose.model('ReviewRequest', reviewRequestSchema);

module.exports = ReviewRequest;