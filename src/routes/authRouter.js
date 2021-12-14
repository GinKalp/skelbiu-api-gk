const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {validateLogin, validateRegister} = require("../validation/authValidator");


// POST /auth/login login
router.post('/login', validateLogin, authController.login);
// POST /auth/register register
router.post('/register', validateRegister, authController.register);

module.exports = router;