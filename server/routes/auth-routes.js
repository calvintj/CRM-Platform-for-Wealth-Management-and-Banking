const express = require('express');
const { loginUser, registerUser } = require('../controllers/auth-controller');
const { validateLogin, validateRegister, handleValidationErrors } = require('../utils/account-validation');

const router = express.Router();

// Login route
router.post('/login', validateLogin, handleValidationErrors, loginUser);

// Register route
router.post('/register', validateRegister, handleValidationErrors, registerUser);

module.exports = router;
