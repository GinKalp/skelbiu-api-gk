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
// POST /listings/update/:id update listing by listing id
router.post('/update/:id', authenticateToken,  imageUploader(), validateListing, listingsController.updateListing);
// DELETE /listings/delete/:id delete listing by listing id
router.delete('/delete/:id', authenticateToken,  listingsController.deleteListing);
// GET /listings/categories get all listings
router.get('/categories', listingsController.getCategories);

module.exports = router;