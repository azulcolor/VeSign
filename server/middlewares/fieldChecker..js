import { body } from 'express-validator'

export const sendDocumentChecker = [
  body('fullName')
    .not()
    .isEmpty()
    .withMessage('Es necesario ingresar el nombre del cliente')
    .isString()
    .withMessage('El nombre del cliente no debe contener números')
    .isLength({ min: 10 })
    .withMessage('El nombre del cliente debe tener al menos 10 caracteres'),

  body('idUser')
    .not()
    .isEmpty()
    .withMessage('Id user is required')
    .isInt()
    .withMessage('Id user must be a number'),

  body('idTemplate')
    .not()
    .isEmpty()
    .withMessage('Es necesario seleccionar un template')
    .isInt()
    .withMessage('Id template must be a number'),

  body('idIdiom')
    .not()
    .isEmpty()
    .withMessage('Es necesario seleccionar un idioma')
    .isInt()
    .withMessage('Id idiom must be a number'),

  body('contractNumber')
    .not()
    .isEmpty()
    .withMessage('Es necesario ingresar el número de contrato'),
]

export const createUserChecker = [
  body('userName')
    .not()
    .isEmpty()
    .withMessage('Ingrese un nombre de usuario')
    .isString()
    .withMessage('El nombre de usuario no debe contener números')
    .isLength({ min: 6 })
    .withMessage('El nombre de usuario debe tener al menos 6 caracteres'),

  body('userEmail')
    .not()
    .isEmpty()
    .withMessage('Ingrese un correo electrónico')
    .isEmail()
    .withMessage('Ingrese un correo electrónico válido'),

  body('userPassword')
    .not()
    .isEmpty()
    .withMessage('Ingresa una contraseña')
    .isString()
    .withMessage('La contraseña debe ser texto')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),

  body('fullName')
    .not()
    .isEmpty()
    .withMessage('El nombre completo es requerido')
    .isString()
    .withMessage('El nombre completo no debe contener números')
    .isLength({ min: 10 })
    .withMessage('El nombre completo debe tener al menos 10 caracteres'),

  body('idRol')
    .not()
    .isEmpty()
    .withMessage('El rol es requerido')
    .isInt()
    .withMessage('El rol debe ser un número'),
]

export const createTemplateChecker = [
  body('pdfName')
    .not()
    .isEmpty()
    .withMessage('Es necesario ingresar el nombre del template')
    .isString()
    .withMessage('El nombre del template debe contener letras')
    .isLength({ min: 2 })
    .withMessage('El nombre del template debe tener al menos 2 caracteres'),

  body('pdfTemplate')
    .not()
    .isEmpty()
    .withMessage('Por favor sube un template')
    .isString()
    .withMessage('Es inválido el template')
    .isLength({ min: 90 })
    .withMessage('Sube un pdf valido'),

  body('idType')
    .not()
    .isEmpty()
    .withMessage('Es necesario seleccionar un tipo de documento')
    .isInt()
    .withMessage('El tipo de documento debe ser un número'),
]
