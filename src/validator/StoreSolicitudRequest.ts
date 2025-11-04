import { body, ValidationChain } from 'express-validator';

export const storeSolicitudValidation: ValidationChain[] = [
    body('cuit')
        .optional()
        .isString().withMessage('cuit must be a string')
        .isLength({ max: 15 }).withMessage('cuit must not exceed 15 characters'),
    
    body('dni')
        .optional()
        .isString().withMessage('dni must be a string')
        .isLength({ max: 15 }).withMessage('dni must not exceed 15 characters'),
    
    body('apellido')
        .notEmpty().withMessage('apellido is required')
        .isString().withMessage('apellido must be a string')
        .isLength({ max: 30 }).withMessage('apellido must not exceed 30 characters'),
    
    body('nombre')
        .notEmpty().withMessage('nombre is required')
        .isString().withMessage('nombre must be a string')
        .isLength({ max: 30 }).withMessage('nombre must not exceed 30 characters'),
    
    body('calle')
        .notEmpty().withMessage('calle is required')
        .isString().withMessage('calle must be a string')
        .isLength({ max: 20 }).withMessage('calle must not exceed 20 characters'),
    
    body('altura')
        .notEmpty().withMessage('altura is required')
        .isString().withMessage('altura must be a string')
        .isLength({ max: 6 }).withMessage('altura must not exceed 6 characters'),
    
    body('piso')
        .optional()
        .isString().withMessage('piso must be a string')
        .isLength({ max: 3 }).withMessage('piso must not exceed 3 characters'),
    
    body('dpto')
        .optional()
        .isString().withMessage('dpto must be a string')
        .isLength({ max: 3 }).withMessage('dpto must not exceed 3 characters'),
    
    body('localidad')
        .notEmpty().withMessage('localidad is required')
        .isInt().withMessage('localidad must be an integer'),
    
    body('celular')
        .optional()
        .isString().withMessage('celular must be a string')
        .isLength({ max: 20 }).withMessage('celular must not exceed 20 characters'),
    
    body('email')
        .optional()
        .isEmail().withMessage('email must be valid')
        .isLength({ max: 50 }).withMessage('email must not exceed 50 characters'),
    
    body('tipo')
        .notEmpty().withMessage('tipo is required')
        .isInt().withMessage('tipo must be an integer'),
    
    body('subestacion')
        .optional()
        .isString().withMessage('subestacion must be a string')
        .isLength({ max: 6 }).withMessage('subestacion must not exceed 6 characters'),
    
    body('asociado')
        .optional()
        .isInt().withMessage('asociado must be an integer'),
    
    body('path')
        .optional()
        .isString().withMessage('path must be a string')
        .isLength({ max: 255 }).withMessage('path must not exceed 255 characters')
];