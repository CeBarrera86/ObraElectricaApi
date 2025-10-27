import sql from 'mssql';
import { config as loadEnv } from 'dotenv';
import { dbConfigGeaCorpico, dbConfigGeaSeguridad, dbConfigAlum } from './dbConfig';
loadEnv();

let pool: sql.ConnectionPool | null = null;

export async function getPool(base: String): Promise<sql.ConnectionPool> {
  let dbConfig: sql.config;
  switch (base) {
    case 'GeaCorpico':
      dbConfig = dbConfigGeaCorpico;
      break;
    case 'GeaSeguridad':
      dbConfig = dbConfigGeaSeguridad;
      break;
    case 'Alum':
      dbConfig = dbConfigAlum;
      break;
    default:
      throw new Error(`Unknown database configuration: ${base}`);
  }
  if (pool && pool.connected) return pool;
  // sql.connect retorna un global pool si se llama así; aquí usamos ConnectionPool para control
  pool = await new sql.ConnectionPool(dbConfig).connect();
  return pool;
}

export async function testConnection(base: String): Promise<void> {
  console.log('🔌 Testing database connection...');
  try {
    const p = await getPool(base);
    console.log('✅ Database connection established');
  } catch (error) {
    console.error('❌ Database connection failed', error);
  }
}

// helper para consultas rápidas
export async function query<T = any>(queryText: string, inputs?: { name: string; type: any; value: any }[], base: String = 'GeaCorpico'): Promise<sql.IResult<T>> {
  const p = await getPool(base);
  const req = p.request();
  if (inputs) for (const i of inputs) req.input(i.name, i.type, i.value);
  const result = await req.query<T>(queryText);
  return result;
}