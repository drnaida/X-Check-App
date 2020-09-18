const reviewRequestRepo = require('./review-request.db');
const taskRepo = require('../tasks/task.db');
const Review = require('./review-request.model');

const getAll = async () => reviewRequestRepo.getAll();

const getById = async reviewRequestId => reviewRequestRepo.getById(reviewRequestId);

const createReviewRequest = async reqBody => {
  const task = await taskRepo.getByTitle(reqBody.task);
  const review = {id: reqBody.task, ...reqBody, selfGrade: task.requirements.map(point => {
      return {
        categoryTitle: point.category,
        items: point.items.map(subPoint => {
          return {
            description: subPoint.description,
            maxScore: subPoint.score,
            score: 0,
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

