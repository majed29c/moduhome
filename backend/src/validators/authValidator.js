const { body, validationResult } = require('express-validator');

const ValidationSignin = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
const { body, validationResult } = require('express-validator');

const ValidationSignup = [
  body('first-name').notEmpty().withMessage('First name is required'),
  body('last-name').notEmpty().withMessage('Last name is required'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('confirm-password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm password must match the password');
      }
      return true;
    }),
  body('phone-number')
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone().withMessage('Invalid phone number format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  ValidationSignin,
  ValidationSignup
};
