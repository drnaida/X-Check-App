const ReviewRequest = require('./review-request.model');

const getAll = async () => ReviewRequest.find({});

const getById = async reviewRequestId => ReviewRequest.findOne({id: reviewRequestId});

const createReviewRequest = async reviewRequest => ReviewRequest.create(reviewRequest);

const updateReviewRequest = async reviewToUpdate => (await ReviewRequest.updateOne({ id: reviewToUpdate.id }, reviewToUpdate)).ok;

const deleteReviewRequest = async reviewRequestId => (await ReviewRequest.deleteOne({ id: reviewRequestId })).ok;

module.exports = { getAll, getById, createReviewRequest, updateReviewRequest, deleteReviewRequest };