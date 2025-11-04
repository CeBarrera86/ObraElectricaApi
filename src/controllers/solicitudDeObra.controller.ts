import e, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { storeSolicitudValidation } from "../validator/StoreSolicitudRequest";
import { Solicitud, SolicitudRequest } from "../types/Solicitud.interface";
import logger from "../utils/logger";
import { guardarSolicitud, obtenerDetalleSolicitudDeObra, obtenerSolicitudes } from "../models/solicitud.model";
import { enviarEmail } from "../services/notificarViaEmail.service";

export const crearSolicitudDeObra = async (req: Request, res: Response) => {
    const { dni, apellido, nombre, calle, altura, piso, dpto, localidad, celular, email, tipo, username } = req.body;

    const solicitud: SolicitudRequest = {
        cuit: dni,
        apellido: apellido,
        nombre: nombre,
        calle: calle,
        altura: altura,
        piso: piso || '',
        dpto: dpto || '',
        localidad: localidad,
        celular: celular || null,
        email: email || null,
        tipo: tipo,
        subestacion: null,
        asociado: null,
        path: null,
        usuario: username
    };

    try {
        const validations = storeSolicitudValidation;
        for (const validation of validations) {
            await validation.run(req);
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const result = await guardarSolicitud(solicitud);
        res.status(201).json({ message: "Solicitud de obra creada exitosamente", data: result });
    } catch (error) {
        logger.error("Error al crear la solicitud de obra:", error);
        res.status(500).json({ message: "Error al crear la solicitud de obra", error });
    }
};

export const getSolicitudesDeObra = async (req: Request, res: Response) => {
    const { estadoId, terminoDeBusqueda } = req.query;
    try {
        const estadoIdNumber = estadoId ? Number(estadoId) : undefined;
        const terminoDeBusquedaString = terminoDeBusqueda ? String(terminoDeBusqueda) : undefined;
        const solicitudes = await obtenerSolicitudes(estadoIdNumber, terminoDeBusquedaString);
        for (const solicitud of solicitudes.solicitudes) {
            solicitud.SOE_TIPO_ID = solicitudes.tiposDeObra.find((tipo) => tipo.TOE_ID === solicitud.SOE_TIPO_ID)?.TOE_ABREVIATURA || 'N/A';
            solicitud.SOE_LOCALIDAD_ID = solicitudes.localidades.find((loc) => loc.LOC_ID === solicitud.SOE_LOCALIDAD_ID)?.LOC_DESCRIPCION || 'N/A';
        }
        logger.info("Solicitudes de obra obtenidas exitosamente");
        res.status(200).json({ data: solicitudes.solicitudes, estadosObra: solicitudes.estadosObra });
    } catch (error) {
        logger.error("Error al obtener las solicitudes de obra:", error);
        res.status(500).json({ message: "Error al obtener las solicitudes de obra", error });
    }
};

export const detallesSolicitudDeObra = async (req: Request, res: Response) => {
    const { solicitudId } = req.query;
    const solicitudIdNumber = Number(solicitudId);
    if (isNaN(solicitudIdNumber)) {
        logger.error("ID de solicitud inválido:", solicitudId);
        res.status(400).json({ message: "ID de solicitud inválido" });
        return;
    }
    const data = await obtenerDetalleSolicitudDeObra(solicitudIdNumber);
    for (const solicitud of data.solicitud) {
        solicitud.SOE_TIPO_ID = data.tiposDeObra.find((tipo) => tipo.TOE_ID === solicitud.SOE_TIPO_ID)?.TOE_DESCRIPCION || 'N/A';
        solicitud.SOE_LOCALIDAD_ID = data.localidades.find((loc) => loc.LOC_ID === solicitud.SOE_LOCALIDAD_ID)?.LOC_DESCRIPCION || 'N/A';
    }
    for (const estado of data.solicitudEstado) {
        estado.SES_OBSERVACIONES = data.estadosObra.find((est) => est.ESO_ID === estado.SES_ESTADO_ID)?.ESO_DESCRIPCION || 'N/A';
        //res.status(200).json({ message: `Detalles de la solicitud de obra con ID: ${solicitudId}`, data: data.solicitud, estadoObra: data.solicitudEstado });
    }
    res.status(200).json({ message: `Detalles de la solicitud de obra con ID: ${solicitudId}`, solicitudDeObra: data.solicitud, estadoObra: data.solicitudEstado });
};

export const presupuestarSolicitudDeObra = async (req: Request, res: Response) => {
    
};

export const notificarSolicitudDeObra = async (req: Request, res: Response) => {

    interface EmailParams {
        empresa: string;
        para: string;
        asunto: string;
        mensaje: string;
        datos: Solicitud;
    }

    const solicitud: Solicitud = {
        "SOE_ID": 2,
        "SOE_CUIT": "32599611",
        "SOE_APELLIDO": "Barrera",
        "SOE_NOMBRE": "Cesar",
        "SOE_CALLE": "Calle 21",
        "SOE_ALTURA": "287",
        "SOE_PISO": "PB",
        "SOE_DPTO": "1",
        "SOE_LOCALIDAD_ID": 10041,
        "SOE_CELULAR": "3513246198",
        "SOE_EMAIL": "barreracesar86@gmail.com",
        "SOE_TIPO_ID": 1,
        "SOE_SUBESTACION": null,
        "SOE_ASOCIADO": null,
        "SOE_SUMINISTRO": null,
        "SOE_OBRA": null,
        "SOE_USUARIO": "cbarrera",
        "SOE_FECHA": new Date("2025-04-15T10:04:56.207Z"),
        "SOE_UPDATE": new Date("2025-04-15T10:04:56.207Z"),
        "SOE_PATH": null
    }

    const { para, empresa, asunto, mensaje } = req.body;
    const datosEmail: EmailParams = { empresa, para, asunto, mensaje, datos: solicitud };
    try {
        await enviarEmail(datosEmail);
        res.status(200).json({ message: "Notificación enviada exitosamente" });
    } catch (error) {
        logger.error("Error al enviar la notificación de la solicitud de obra:", error);
        res.status(500).json({ message: "Error al enviar la notificación de la solicitud de obra", error });
    }
};