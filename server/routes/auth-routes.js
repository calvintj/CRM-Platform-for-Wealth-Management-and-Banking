const express = require('express');
const { loginUser, registerUser, updateUser, updatePassword } = require('../controllers/auth-controller');
const { validateLogin, validateRegister, handleValidationErrors } = require('../utils/account-validation');

const router = express.Router();

// Login route
router.post('/login', validateLogin, handleValidationErrors, loginUser);

// Register route
router.post('/register', validateRegister, handleValidationErrors, registerUser);

// Update user route
router.put('/update-user', updateUser);

// Update password route
router.put('/update-password', updatePassword);

module.exports = router;
