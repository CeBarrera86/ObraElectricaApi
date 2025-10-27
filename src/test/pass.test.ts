describe('Password Encoding and Decoding', () => {
    let passModule: typeof import('../services/pass');

    beforeAll(async () => {
        passModule = await import('../services/pass');
    });

    // test('encodes and decodes a simple password correctly', () => {
    //     const originalPass = 'password123';
    //     const encodedPass = passModule.codificar(originalPass);
    //     const decodedPass = passModule.decodificar(encodedPass);
    //     expect(decodedPass).toBe(originalPass);
    // });

    test('encodes and decodes a password with special characters', () => {
        const originalPass = 'p@ssw0rd!#';
        const encodedPass = passModule.codificar(originalPass);
        const decodedPass = passModule.decodificar(encodedPass);
        expect(decodedPass).toBe(originalPass);
    });

    test('encodes and decodes an empty password', () => {
        const originalPass = '';
        const encodedPass = passModule.codificar(originalPass);
        const decodedPass = passModule.decodificar(encodedPass);
        expect(decodedPass).toBe(originalPass);
    });

    // test('encodes and decodes a long password', () => {
    //     const originalPass = 'thisisaverylongpassword123!';
    //     const encodedPass = passModule.codificar(originalPass);
    //     const decodedPass = passModule.decodificar(encodedPass);
    //     expect(decodedPass).toBe(originalPass);
    // });

    // test('encodes and decodes a password with quotes and pipes', () => {
    //     const originalPass = `pa'ss|word"`;
    //     const encodedPass = passModule.codificar(originalPass);
    //     const decodedPass = passModule.decodificar(encodedPass);
    //     expect(decodedPass).toBe(originalPass);
    // });

    test('encodes and decodes a password with unicode characters', () => {
        const originalPass = 'pässwörd😊';
        const encodedPass = passModule.codificar(originalPass);
        const decodedPass = passModule.decodificar(encodedPass);
        expect(decodedPass).toBe(originalPass);
    });

    test('encodes and decodes a password with all identical characters', () => {
        const originalPass = 'aaaaaa';
        const encodedPass = passModule.codificar(originalPass);
        const decodedPass = passModule.decodificar(encodedPass);
        expect(decodedPass).toBe(originalPass);
    });

    test('encodes and decodes a password with mixed case letters', () => {
        const originalPass = 'PaSsWoRd';
        const encodedPass = passModule.codificar(originalPass);
        const decodedPass = passModule.decodificar(encodedPass);
        expect(decodedPass).toBe(originalPass);
    });

    // test('encodes and decodes a password with numbers only', () => {
    //     const originalPass = '1234567890';
    //     const encodedPass = passModule.codificar(originalPass);
    //     const decodedPass = passModule.decodificar(encodedPass);
    //     expect(decodedPass).toBe(originalPass);
    // });

    test('encodes and decodes a password with whitespace characters', () => {
        const originalPass = 'pass word\twith\nspaces';
        const encodedPass = passModule.codificar(originalPass);
        const decodedPass = passModule.decodificar(encodedPass);
        expect(decodedPass).toBe(originalPass);
    });

    test('encodes and decodes a very short password', () => {
        const originalPass = 'a';
        const encodedPass = passModule.codificar(originalPass);
        const decodedPass = passModule.decodificar(encodedPass);
        expect(decodedPass).toBe(originalPass);
    });

    test('decodes a password from the database', () => {
        const originalPass = 'cesar25';
        const encodedPass = '60u]x_j';
        // const encodedPass = passModule.codificar(originalPass);
        const decodedPass = passModule.decodificar(encodedPass);
        expect(decodedPass).toBe(originalPass);
    });

    test('decodes another a password from the database', () => {
        const originalPass = 'noe25';
        const encodedPass = '60hks';
        // const encodedPass = passModule.codificar(originalPass);
        const decodedPass = passModule.decodificar(encodedPass);
        expect(decodedPass).toBe(originalPass);
    });

    test('test for "corpico"', () => {
        const originalPass = 'corpico';
        const encodedPass = 'pallwij';
        // const encodedPass = passModule.codificar(originalPass);
        const decodedPass = passModule.decodificar(encodedPass);
        expect(decodedPass).toBe(originalPass);
    });
});