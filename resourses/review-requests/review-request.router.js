const router = require('express').Router();
const ReviewRequest = require('./review-request.model');
const reviewRequestService = require('./review-request.service');
const catchErrors = require('../../helpers/catchErrors');
const { ErrorHandler } = require('../../helpers/errorHandler');
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');
const { reviewRequestBodyValidation } = require('../../validators/validator');
const { validationResult } = require('express-validator');

router.route('/').get(
  catchErrors(async (req, res) => {
    const reviews = await reviewRequestService.getAll();
    await res.json(reviews.map(ReviewRequest.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const review = await reviewRequestService.getById(req.params.id);
    if (!review) {
      throw new ErrorHandler(
        NOT_FOUND,
        `Review request with id ${req.params.id} not found`
      );
    } else {
      await res.json(ReviewRequest.toResponse(review));
    }
  })
);

router.route('/').post(
  reviewRequestBodyValidation(),
  catchErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    } else {
      const updatedReview = await reviewRequestService.createReviewRequest(req.body);
      await res.json(ReviewRequest.toResponse(updatedReview));
    }
  })
)

router.route('/:id').put(
  reviewRequestBodyValidation(),
  catchErrors(async (req, res) => {
    const errors = validationResult(req);
    const review = await reviewRequestService.updateReviewRequest(req.params.id, req.body);
    if (!errors.isEmpty() || !review) {
      throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
    } else {
      await res.json(ReviewRequest.toResponse(review));
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const deleteReview = await reviewRequestService.deleteReviewRequest(req.params.id);
    if (!deleteReview) {
      throw new ErrorHandler(
        NOT_FOUND,
        `Review request with id ${req.params.id} not found`
      );
    } else {
      await res
        .status(OK)
        .json({ message: 'Review request has been deleted' });
    }
  })
);

module.exports = router;