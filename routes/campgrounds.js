const express = require('express');
const multer  = require('multer')

const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn , validateCampground , isAuthor } = require('../middleware');    
const {storage} = require('../cloudinary')
const upload = multer({ storage });



router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

router.get(`/new`, isLoggedIn , catchAsync(campgrounds.renderNewForm))

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground ))
    .put(isLoggedIn ,isAuthor , upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn ,isAuthor , catchAsync(campgrounds.deleteCampground))

router.get(`/:id/edit`,  isLoggedIn ,isAuthor , catchAsync(campgrounds.editRenderForm))




module.exports = router