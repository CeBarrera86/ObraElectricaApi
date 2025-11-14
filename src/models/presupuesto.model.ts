import sql, { IProcedureResult } from "mssql";
import { getPool } from "../config/db";

export const guardarPresupuestoSolicitud = async (solicitudId: number, usuario: string, path: string): Promise<IProcedureResult<any>> => {
    const pool = await getPool('Alum');
    try {
        const result = await pool.request()
            .input("ID", solicitudId)
            .input("USUARIO", usuario)
            .input("PATH", path)
            .execute("PRESUPUESTAR_SOLICITUD");
        return result;
    } catch (error) {
        console.error("Error al guardar presupuesto:", error);
        throw error;
    }
};

export const notificarPresupuestoSolicitud = async (solicitudId: number, usuario: string, origen: string, destino: string, msj: string, asunto: string, adjunto?: any): Promise<IProcedureResult<any>> => {
    const pool = await getPool('Alum');
    try {
        const request = pool.request()
            .input("ID", solicitudId)
            .input("USUARIO", usuario)
            .input("ORIGEN", origen)
            .input("DESTINO", destino)
            .input("MSJ", msj)
            .input("ASUNTO", asunto)
        if (adjunto) {
            request.input("ADJUNTO", sql.VarChar, adjunto);
        }
        const result = await request.execute("NOTIFICACION_PRESUPUESTO");
        return result;
    } catch (error) {
        console.error("Error al notificar presupuesto:", error);
        throw error;
    }
};