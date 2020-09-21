const reviewRequestRepo = require('./review-request.db');
const taskRepo = require('../tasks/task.db');

const getAll = async () => reviewRequestRepo.getAll();

const getById = async reviewRequestId => reviewRequestRepo.getById(reviewRequestId);

const createReviewRequest = async reqBody => {
  const task = await taskRepo.getById(reqBody.taskId);
  const review = {...reqBody, requirements: task.requirements.map(point => {
      return {
        title: point.title,
        category: point.category,
        items: point.items.map(subPoint => {
          return {
            description: subPoint.description,
            score: subPoint.score,
            selfMark: subPoint.selfMark,
            marks: []
          }
        })
      }
    })};
  await reviewRequestRepo.createReviewRequest(review);
  return review
};

const updateReviewRequest = async (reviewRequestId, reqBody) => reviewRequestRepo.updateReviewRequest({id: reviewRequestId, ...reqBody});

const deleteReviewRequest = async reviewRequestId => reviewRequestRepo.deleteReviewRequest(reviewRequestId);

module.exports = {getAll, getById, createReviewRequest, updateReviewRequest, deleteReviewRequest};

