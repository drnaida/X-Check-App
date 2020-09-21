const reviewRequestRepo = require('./review-request.db');
const taskRepo = require('../tasks/task.db');

const getAll = async () => reviewRequestRepo.getAll();

const getById = async reviewRequestId => reviewRequestRepo.getById(reviewRequestId);

const createReviewRequest = async reqBody => reviewRequestRepo.createReviewRequest(reqBody);

const updateReviewRequest = async (reviewRequestId, reqBody) => reviewRequestRepo.updateReviewRequest({id: reviewRequestId, ...reqBody});

const deleteReviewRequest = async reviewRequestId => reviewRequestRepo.deleteReviewRequest(reviewRequestId);

module.exports = {getAll, getById, createReviewRequest, updateReviewRequest, deleteReviewRequest};

