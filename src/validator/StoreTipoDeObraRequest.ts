import { body, ValidationChain } from "express-validator";

export const storeTipoDeObraValidation: ValidationChain[] = [
    body('abreviatura')
        .notEmpty().withMessage('abreviatura is required')
        .isString().withMessage('abreviatura must be a string')
        .isLength({ max: 5 }).withMessage('abreviatura must not exceed 5 characters'),

    body('descripcion')
        .notEmpty().withMessage('descripcion is required')
        .isString().withMessage('descripcion must be a string')
        .isLength({ max: 50 }).withMessage('descripcion must not exceed 50 characters'),

    body('interno')
        .optional()
        .isIn(['S', 'N']).withMessage('interno must be either S or N')
];