import { storeTipoDeObraValidation } from '../validator/StoreTipoDeObraRequest';
import { validationResult } from 'express-validator';

describe('storeTipoDeObraValidation', () => {
    it('should return true for valid request with all fields', async () => {
        const validRequest = {
            abreviatura: 'ABC',
            descripcion: 'Test Description',
            interno: 'S'
        };
        const req = {
            body: validRequest,
            query: {},
            params: {},
            headers: {},
            get: () => undefined
        } as any;
        const validations = storeTipoDeObraValidation;
        for (const validation of validations) {
            await validation.run(req);
        }
        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(true);
    });

    it('should return true for valid request with interno as N', async () => {
        const validRequest = {
            abreviatura: 'XYZ',
            descripcion: 'Another Description',
            interno: 'N'
        };
        const req = {
            body: validRequest,
            query: {},
            params: {},
            headers: {},
            get: () => undefined
        } as any;
        const validations = storeTipoDeObraValidation;
        for (const validation of validations) {
            await validation.run(req);
        }
        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(true);
    });

    it('should return true for valid request without optional interno field', async () => {
        const validRequest = {
            abreviatura: 'TEST',
            descripcion: 'Test'
        };
        const req = {
            body: validRequest,
            query: {},
            params: {},
            headers: {},
            get: () => undefined
        } as any;
        const validations = storeTipoDeObraValidation;
        for (const validation of validations) {
            await validation.run(req);
        }
        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(true);
    });

    it('should return errors for invalid abreviatura exceeding max length', async () => {
        const invalidRequest = {
            abreviatura: 'ABCDEF',
            descripcion: 'Test Description',
            interno: 'S'
        };
        const req = {
            body: invalidRequest,
            query: {},
            params: {},
            headers: {},
            get: () => undefined
        } as any;
        const validations = storeTipoDeObraValidation;
        for (const validation of validations) {
            await validation.run(req);
        }
        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array().some(e => e.msg === 'abreviatura must not exceed 5 characters')).toBe(true);
    });

    it('should return errors for invalid descripcion exceeding max length', async () => {
        const invalidRequest = {
            abreviatura: 'ABC',
            descripcion: 'A'.repeat(51),
            interno: 'S'
        };
        const req = {
            body: invalidRequest,
            query: {},
            params: {},
            headers: {},
            get: () => undefined
        } as any;
        const validations = storeTipoDeObraValidation;
        for (const validation of validations) {
            await validation.run(req);
        }
        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array().some(e => e.msg === 'descripcion must not exceed 50 characters')).toBe(true);
    });

    it('should return errors for invalid interno value', async () => {
        const invalidRequest = {
            abreviatura: 'ABC',
            descripcion: 'Test Description',
            interno: 'X'
        };
        const req = {
            body: invalidRequest,
            query: {},
            params: {},
            headers: {},
            get: () => undefined
        } as any;
        const validations = storeTipoDeObraValidation;
        for (const validation of validations) {
            await validation.run(req);
        }
        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
    });

    it('should return errors for missing required fields', async () => {
        const invalidRequest = {};
        const req = {
            body: invalidRequest,
            query: {},
            params: {},
            headers: {},
            get: () => undefined
        } as any;
        const validations = storeTipoDeObraValidation;
        for (const validation of validations) {
            await validation.run(req);
        }
        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array().some(e => e.msg === 'abreviatura is required')).toBe(true);
        expect(errors.array().some(e => e.msg === 'descripcion is required')).toBe(true);
    });
});