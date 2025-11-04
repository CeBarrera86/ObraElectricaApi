import sql from 'mssql';
import { config as loadEnv } from 'dotenv';
import { dbConfigGeaCorpico, dbConfigGeaSeguridad, dbConfigAlum } from './dbConfig';
loadEnv({ quiet: true });

const pools: { [key: string]: sql.ConnectionPool | null } = {
  GeaCorpico: null,
  GeaSeguridad: null,
  Alum: null
};

export async function getPool(base: string): Promise<sql.ConnectionPool> {
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

  // Check if we already have a connected pool for this specific database
  if (pools[base] && pools[base]!.connected) {
    return pools[base]!;
  }

  // Create new pool for this database
  pools[base] = await new sql.ConnectionPool(dbConfig).connect();
  return pools[base]!;
}