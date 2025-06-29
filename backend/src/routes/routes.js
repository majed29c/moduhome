const express = require('express');
const router = express.Router();

const ValidationSignin = require('../validators/authValidator').ValidationSignin;
const Signin = require('../controllers/authController').Signin;

router.get('/', (req, res) => {
  console.log("hello");
});

router.post('/signin', ValidationSignin, Signin);

module.exports = router;
