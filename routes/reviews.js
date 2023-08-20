const express = require('express');
const router = express.Router({mergeParams : true});
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');
const Review = require('../models/review')
const reviews = require('../controllers/reviews')
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');


router.post(`/`,isLoggedIn , validateReview, catchAsync(reviews.createReviews))
router.delete(`/:reviewId`,isLoggedIn , isReviewAuthor, catchAsync(reviews.deleteReview ))
module.exports = router;