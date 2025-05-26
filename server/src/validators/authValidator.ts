import { body } from 'express-validator';

export const registerValidator = [
  body('name').isLength({ min: 2 }).withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('Valid email required')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/\d/).withMessage('Password must contain a number')
];

export const loginValidator = [
  body('email').isEmail(),
  body('password').notEmpty()
];
