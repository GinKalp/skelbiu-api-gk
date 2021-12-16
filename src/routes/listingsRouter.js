const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listingsController');
const {imageUploader} = require("../helpers/multerHelper");
const {authenticateToken} = require("../helpers/jwtHelper");
const {validateListing} = require("../validation/listingsValidator");

// GET /listings/ get all listings
router.get('/', authenticateToken, listingsController.getAllListings);
// GET /listings/by-user get all listings by user
router.get('/by-user', authenticateToken, listingsController.getListingsByUser);
// POST /listings/add-new add new listing
router.post('/add-new', authenticateToken,  imageUploader(), validateListing, listingsController.addNewListing);


module.exports = router;