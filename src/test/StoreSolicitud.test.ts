import { storeSolicitudValidation } from '../validator/StoreSolicitudRequest';
import { SolicitudRequest } from '../types/Solicitud.interface';
import { validationResult } from 'express-validator';

it('should return true for valid request', async () => {
    const validRequest: SolicitudRequest = {
        cuit: '20-12345678-9',
        apellido: 'Doe',
        nombre: 'John',
        calle: 'Main St',
        altura: '123',
        piso: '1',
        dpto: 'A',
        localidad: 1,
        celular: '1234567890',
        email: 'john.doe@example.com',
        tipo: 1,
        subestacion: '451',
        asociado: 1,
        path: '/path/to/file',
        usuario: 'johndoe'
    };
    const req = {
        body: validRequest,
        query: {},
        params: {},
        headers: {},
        get: () => undefined
    } as any;
    const validations = storeSolicitudValidation;
    for (const validation of validations) {
        await validation.run(req);
    }
    const errors = validationResult(req);
    console.log(errors.array());
    expect(errors.isEmpty()).toBe(true);
});

it('should return true for a valid request with missing optional fields', async () => {
    const invalidRequest: SolicitudRequest = {
        cuit: '20-12345678-9',
        apellido: 'Doe',
        nombre: 'John',
        calle: 'Main St',
        altura: '123',
        localidad: 1,
        tipo: 1,
        usuario: 'johndoe'
    };
    const req = {
        body: invalidRequest,
        query: {},
        params: {},
        headers: {},
        get: () => undefined
    } as any;
    const validations = storeSolicitudValidation;
    for (const validation of validations) {
        await validation.run(req);
    }
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
});

it('should return errors for invalid request', async () => {
    const invalidRequest: any = {
        cuit: '',
        apellido: 123,
        nombre: 'John',
        calle: 'Main St',
        altura: '123',
        localidad: 'not-an-integer',
        tipo: null,
        usuario: 'johndoe'
    };
    const req = {
        body: invalidRequest,
        query: {},
        params: {},
        headers: {},
        get: () => undefined
    } as any;
    const validations = storeSolicitudValidation;
    for (const validation of validations) {
        await validation.run(req);
    }
    const errors = validationResult(req);
    console.log(errors.array());
    expect(errors.isEmpty()).toBe(false);
});