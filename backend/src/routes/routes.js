const express = require('express');
const router = express.Router();

const ValidationSignin = require('../validators/authValidator').ValidationSignin;
const ValidationSignup = require('../validators/authValidator').ValidationSignup;
const verifyEmailController = require('../controllers/authController').verifyEmailController;
const Signup = require('../controllers/authController').Signup;
const Signin = require('../controllers/authController').Signin;

router.post('/signin', ValidationSignin, Signin);
router.post('/signup',ValidationSignup, Signup);
router.get('/verify-email', verifyEmailController);
module.exports = router;
