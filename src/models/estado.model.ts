import { SolicitudEstado } from "types/SolicitudEstado.interface";
import { getPool } from "../config/db";

export const getEstadosFromDB = async (): Promise<SolicitudEstado[]> => {
    const pool = await getPool('Alum');
    const data = await pool.query("SELECT * FROM SOLICITUD_ESTADO");
    return data.recordset;
};