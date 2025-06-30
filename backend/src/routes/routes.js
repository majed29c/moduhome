const express = require('express');
const router = express.Router();

const ValidationSignin = require('../validators/authValidator').ValidationSignin;
const ValidationSignup = require('../validators/authValidator').ValidationSignup;
const Signup = require('../controllers/authController').Signup;
const Signin = require('../controllers/authController').Signin;

router.get('/', (req, res) => {
  console.log("hello");
});

router.post('/signin', ValidationSignin, Signin);
router.post('/signup',ValidationSignup, Signup);
module.exports = router;
