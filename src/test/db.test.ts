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
    try {
      const pool = await getPool();
      if (pool && pool.connected) {
        await pool.close();
      }
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  test('getPool connects and returns a connected pool (and caches it)', async () => {
    const { getPool } = await import('../config/db');
    const p1 = await getPool();
    expect(p1).toBeDefined();
    expect(p1.connected).toBe(true);

    // second call should return same cached pool
    const p2 = await getPool();
    expect(p2).toBe(p1);
  });

  test('testConnection establishes actual database connection', async () => {
    const { testConnection } = await import('../config/db');
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    await expect(testConnection()).resolves.not.toThrow();
    expect(spy).toHaveBeenCalledWith('✅ Database connection established');
    
    spy.mockRestore();
  });

  test('query executes actual database query', async () => {
    const { query } = await import('../config/db');

    // Use a simple query that should work on most SQL Server instances
    const res = await query('SELECT 1 as test_value');

    expect(res).toHaveProperty('recordset');
    expect(res.recordset).toBeInstanceOf(Array);
    expect(res.recordset[0]).toHaveProperty('test_value', 1);
  });
});
