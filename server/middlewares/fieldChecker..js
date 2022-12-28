import { body } from 'express-validator';

export const sendDocumentChecker = [
  body('fullName')
    .not()
    .isEmpty()
    .withMessage('Full name is required')
    .isString()
    .withMessage('Full name must be a string')
    .isLength({ min: 10 }),

  body('idUser')
    .not()
    .isEmpty()
    .withMessage('Id user is required')
    .isInt()
    .withMessage('Id user must be a number'),

  body('idTemplate')
    .not()
    .isEmpty()
    .withMessage('Id template is required')
    .isInt()
    .withMessage('Id template must be a number'),

  body('idIdiom')
    .not()
    .isEmpty()
    .withMessage('Id idiom is required')
    .isInt()
    .withMessage('Id idiom must be a number'),
];

export const createUserChecker = [
  body('userName')
    .not()
    .isEmpty()
    .withMessage('User Name is required')
    .isString()
    .withMessage('User Name must be a string')
    .isLength({ min: 6 })
    .withMessage('User Name must be at least 6 characters'),

  body('userEmail')
    .not()
    .isEmpty()
    .withMessage('User Email is required')
    .isEmail()
    .withMessage('User Email must be a valid email'),

  body('userPassword')
    .not()
    .isEmpty()
    .withMessage('User Password is required')
    .isString()
    .withMessage('User Password must be a string')
    .isLength({ min: 6 })
    .withMessage('User Password must be at least 6 characters'),

  body('fullName')
    .not()
    .isEmpty()
    .withMessage('Full name is required')
    .isString()
    .withMessage('Full name must be a string')
    .isLength({ min: 10 })
    .withMessage('Full name must be at least 10 characters'),

  body('idRol')
    .not()
    .isEmpty()
    .withMessage('User Role is required')
    .isInt()
    .withMessage('User Role must be a number'),
];
