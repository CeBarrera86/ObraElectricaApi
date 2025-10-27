import sql from 'mssql';
import { config as loadEnv } from 'dotenv';
loadEnv();

export const dbConfigGeaCorpico: sql.config = {
  user: process.env.DB_USER || undefined,
  password: process.env.DB_PASSWORD || undefined,
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE_GEACORPICO || 'master',
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

export const dbConfigGeaSeguridad: sql.config = {
  user: process.env.DB_USER || undefined,
  password: process.env.DB_PASSWORD || undefined,
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE_GEASEGURIDAD || 'master',
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

export const dbConfigAlum: sql.config = {
  user: process.env.DB_USER || undefined,
  password: process.env.DB_PASSWORD || undefined,
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE_ALUM || 'master',
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