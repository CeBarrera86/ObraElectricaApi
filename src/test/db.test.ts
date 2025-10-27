// Integration tests for src/config/db.ts
// These tests use actual database connections - ensure test DB is available
/* eslint-disable @typescript-eslint/no-var-requires */

describe('src/config/db', () => {
  beforeEach(() => {
    // ensure module cache is reset so module-level `pool` is reinitialized
    jest.resetModules();
  });

  afterEach(async () => {
    // Clean up any open connections
    const { getPool } = await import('../config/db');
    const databases = ['GeaCorpico', 'GeaSeguridad', 'Alum'];

    for (const db of databases) {
      try {
        const pool = await getPool(db);
        if (pool && pool.connected) {
          await pool.close();
        }
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  });

  describe('getPool', () => {
    test('connects to GeaCorpico and returns a connected pool', async () => {
      const { getPool } = await import('../config/db');

      const pool = await getPool('GeaCorpico');
      expect(pool).toBeDefined();
      expect(pool.connected).toBe(true);
    });

    test('connects to GeaSeguridad and returns a connected pool', async () => {
      const { getPool } = await import('../config/db');

      const pool = await getPool('GeaSeguridad');
      expect(pool).toBeDefined();
      expect(pool.connected).toBe(true);
    });

    test('connects to Alum and returns a connected pool', async () => {
      const { getPool } = await import('../config/db');

      const pool = await getPool('Alum');
      expect(pool).toBeDefined();
      expect(pool.connected).toBe(true);
    });

    test('throws error for unknown database configuration', async () => {
      const { getPool } = await import('../config/db');

      await expect(getPool('UnknownDB')).rejects.toThrow('Unknown database configuration: UnknownDB');
    });
  });

  describe('singleton pool behavior', () => {
    test('returns the same pool instance on multiple calls for GeaCorpico', async () => {
      const { getPool } = await import('../config/db');
      const pool1 = await getPool('GeaCorpico');
      const pool2 = await getPool('GeaCorpico');
      expect(pool1).toBe(pool2);
    });

    test('returns the same pool instance on multiple calls for GeaSeguridad', async () => {
      const { getPool } = await import('../config/db');
      const pool1 = await getPool('GeaSeguridad');
      const pool2 = await getPool('GeaSeguridad');
      expect(pool1).toBe(pool2);
    });
    
    test('returns the same pool instance on multiple calls for Alum', async () => {
      const { getPool } = await import('../config/db');
      const pool1 = await getPool('Alum');
      const pool2 = await getPool('Alum');
      expect(pool1).toBe(pool2);
    });
  });

  describe('testConnection', () => {
    test('establishes connection to GeaCorpico', async () => {
      const { testConnection } = await import('../config/db');
      const spy = jest.spyOn(console, 'log').mockImplementation(() => { });

      await expect(testConnection('GeaCorpico')).resolves.not.toThrow();
      expect(spy).toHaveBeenCalledWith('✅ Database connection established');

      spy.mockRestore();
    });

    test('establishes connection to GeaSeguridad', async () => {
      const { testConnection } = await import('../config/db');
      const spy = jest.spyOn(console, 'log').mockImplementation(() => { });

      await expect(testConnection('GeaSeguridad')).resolves.not.toThrow();
      expect(spy).toHaveBeenCalledWith('✅ Database connection established');

      spy.mockRestore();
    });

    test('establishes connection to Alum', async () => {
      const { testConnection } = await import('../config/db');
      const spy = jest.spyOn(console, 'log').mockImplementation(() => { });

      await expect(testConnection('Alum')).resolves.not.toThrow();
      expect(spy).toHaveBeenCalledWith('✅ Database connection established');

      spy.mockRestore();
    });
  });

  describe('query', () => {
    test('executes query on GeaCorpico', async () => {
      const { query } = await import('../config/db');

      const res = await query('SELECT 1 as test_value', undefined, 'GeaCorpico');

      expect(res).toHaveProperty('recordset');
      expect(res.recordset).toBeInstanceOf(Array);
      expect(res.recordset[0]).toHaveProperty('test_value', 1);
    });

    test('executes query on GeaSeguridad', async () => {
      const { query } = await import('../config/db');

      const res = await query('SELECT 1 as test_value', undefined, 'GeaSeguridad');

      expect(res).toHaveProperty('recordset');
      expect(res.recordset).toBeInstanceOf(Array);
      expect(res.recordset[0]).toHaveProperty('test_value', 1);
    });

    test('executes query on Alum', async () => {
      const { query } = await import('../config/db');

      const res = await query('SELECT 1 as test_value', undefined, 'Alum');

      expect(res).toHaveProperty('recordset');
      expect(res.recordset).toBeInstanceOf(Array);
      expect(res.recordset[0]).toHaveProperty('test_value', 1);
    });
  });
});