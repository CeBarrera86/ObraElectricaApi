import logger from "../utils/logger";
import { getPool } from "../config/db";
import { TipoDeObra } from "../types/TipoObra.interface";


export const getTiposDeObraFromDB: () => Promise<TipoDeObra[]> = async () => {
    const db = await getPool('Alum');
    const result = await db.query('SELECT * FROM TIPO_OBRA_ELECTRICA');
    return result.recordset;
};
