import sql from 'mssql';
import { config as loadEnv } from 'dotenv';
loadEnv();

const dbConfig: sql.config = {
  user: process.env.DB_USER || undefined,
  password: process.env.DB_PASSWORD || undefined,
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE || 'master',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getPool(): Promise<sql.ConnectionPool> {
  if (pool!.connected) {
    console.log('Database connection established');
  } else {
    console.error('Database connection failed');
  }
  if (pool && pool.connected) return pool;
  // sql.connect retorna un global pool si se llama así; aquí usamos ConnectionPool para control
  pool = await new sql.ConnectionPool(dbConfig).connect();
  return pool;
}

export async function testConnection(): Promise<void> {
  try {
    const p = await getPool();
    console.log('✅ Database connection established');
  } catch (error) {
    console.error('❌ Database connection failed', error);
  }
}

// helper para consultas rápidas
export async function query<T = any>(queryText: string, inputs?: { name: string; type: any; value: any }[]) {
  const p = await getPool();
  const req = p.request();
  if (inputs) for (const i of inputs) req.input(i.name, i.type, i.value);
  const result = await req.query<T>(queryText);
  return result;
}