import { Solicitud, SolicitudRequest } from "../types/Solicitud.interface";
import { getPool } from "../config/db";
import logger from "../utils/logger";
import { IProcedureResult } from "mssql";
import { TipoDeObra } from "../types/TipoObra.interface";
import { Localidad } from "../types/Localidad.interface";
import { Estado } from "../types/Estado.interface";
import { SolicitudEstado } from "../types/SolicitudEstado.interface";

export const guardarSolicitud = async (solicitud: SolicitudRequest): Promise<IProcedureResult<any>> => {
    const db = await getPool('Alum');

    try {
        const result = await db.request()
            .input('CUIT', solicitud.cuit)
            .input('NOMBRE', solicitud.nombre)
            .input('APELLIDO', solicitud.apellido)
            .input('CALLE', solicitud.calle)
            .input('ALTURA', solicitud.altura)
            .input('PISO', solicitud.piso)
            .input('DPTO', solicitud.dpto)
            .input('LOCALIDAD', solicitud.localidad)
            .input('CELULAR', solicitud.celular)
            .input('EMAIL', solicitud.email)

 
            .input('TIPO', solicitud.tipo)
            .input('USUARIO', solicitud.usuario)
            .execute('CREAR_NUEVA_SOLICITUD_DE_OBRA');
        logger.info("Solicitud guardada exitosamente con ID: " + result.recordset[0].NewId);
        return result;
    } catch (error) {
        logger.error("Error al guardar la solicitud:", error);
        throw error;
    }
};

export const obtenerSolicitudes = async (estadoId?: number, terminoDeBusqueda?: string): Promise<{ solicitudes: any[]; tiposDeObra: TipoDeObra[]; localidades: Localidad[]; estadosObra: Estado[] }> => {
    const db = await getPool('Alum');
    try {
        const data = {
            solicitudes: [] as Solicitud[],
            tiposDeObra: [] as TipoDeObra[],
            localidades: [] as Localidad[],
            estadosObra: [] as Estado[]
        };
        let solicitudes;
        if (estadoId) {
            solicitudes = await db.request()
                .input('estadoId', estadoId)
                .query('  SELECT SOE.* FROM SOLICITUD_OBRA_ELECTRICA SOE INNER JOIN SOLICITUD_ESTADO SE ON SOE.SOE_ID = SE.SES_SOLICITUD_ID WHERE SE.SES_ESTADO_ID = @estadoId');
            data.solicitudes = solicitudes.recordset;
        } else {
            solicitudes = await db.query('SELECT * FROM SOLICITUD_OBRA_ELECTRICA');
            data.solicitudes = solicitudes.recordset;
        }

        const tiposDeObra = await db.query('SELECT * FROM TIPO_OBRA_ELECTRICA');
        const localidades = await db.query('SELECT * FROM GeaCorpico.dbo.LOCALIDAD WHERE LOC_SUCURSAL = 1');
        const estadosObra = await db.query('SELECT * FROM ESTADO_SOLICITUD_OBRA');
        data.solicitudes = solicitudes.recordset;
        data.tiposDeObra = tiposDeObra.recordset;
        data.localidades = localidades.recordset;
        data.estadosObra = estadosObra.recordset;
        return data;
    } catch (error) {
        logger.error("Error al obtener las solicitudes:", error);
        throw error;
    }
};
export const obtenerDetalleSolicitudDeObra = async (solicitudId: number): Promise<{ solicitud: any[]; tiposDeObra: TipoDeObra[]; localidades: Localidad[]; estadosObra: Estado[]; solicitudEstado: SolicitudEstado[] }> => {
    const db = await getPool('Alum');
    try {
        const data = {
            solicitud: [] as Solicitud[],
            tiposDeObra: [] as TipoDeObra[],
            localidades: [] as Localidad[],
            estadosObra: [] as Estado[],
            solicitudEstado: [] as SolicitudEstado[]
        };
        const solicitud = await db.request()
            .input('solicitudId', solicitudId)
            .query('SELECT * FROM SOLICITUD_OBRA_ELECTRICA WHERE SOE_ID = @solicitudId');
        const tiposDeObra = await db.query('SELECT * FROM TIPO_OBRA_ELECTRICA');
        const localidades = await db.query('SELECT * FROM GeaCorpico.dbo.LOCALIDAD WHERE LOC_SUCURSAL = 1');
        const estadosObra = await db.query('SELECT * FROM ESTADO_SOLICITUD_OBRA');
        const solicitudEstado = await db.request()
            .input('solicitudId', solicitudId)
            .query('SELECT * FROM SOLICITUD_ESTADO WHERE SES_SOLICITUD_ID = @solicitudId');
        data.solicitud = solicitud.recordset;
        data.tiposDeObra = tiposDeObra.recordset;
        data.localidades = localidades.recordset;
        data.estadosObra = estadosObra.recordset;
        data.solicitudEstado = solicitudEstado.recordset;
        return data;
    } catch (error) {
        logger.error("Error al obtener las solicitudes:", error);
        throw error;
    }
};
