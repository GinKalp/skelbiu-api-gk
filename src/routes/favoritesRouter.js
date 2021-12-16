const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');
const {authenticateToken} = require("../helpers/jwtHelper");

// get /favorites/ favorite or remove an item
router.get('/:listingId',  authenticateToken,favoritesController.modifyFavorite);



module.exports = router;