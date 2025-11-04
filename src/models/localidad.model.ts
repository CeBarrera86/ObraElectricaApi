import { Localidad } from "../types/Localidad.interface";
import { getPool } from "../config/db";

export const getLocalidadesFromDB = async (): Promise<Localidad[]> => {
    const pool = await getPool('GeaCorpico');
    const data = await pool.query("SELECT * FROM LOCALIDAD WHERE LOC_SUCURSAL = 1");
    return data.recordset;
};