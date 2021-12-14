const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listingsController');
const {imageUploader} = require("../helpers/multerHelper");

// GET /listings/ add new product
router.get('/',  listingsController.getAllListings);
// POST /listings/add-new add new product
router.post('/add-new', imageUploader(), listingsController.addNewListing);


module.exports = router;