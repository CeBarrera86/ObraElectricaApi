import { Request, Response } from "express";
import { guardarPresupuestoSolicitud, notificarPresupuestoSolicitud } from "../models/presupuesto.model";
import logger from "../utils/logger";
import { obtenerDetalleSolicitudDeObra } from "../models/solicitud.model";
import { emailElectrico } from "../config/email.config";
import { enviarEmail } from "../services/notificarViaEmail.service";

export const presupuestarSolicitud = async (req: Request, res: Response) => {
    const { solicitudId, usuario } = req.query;
    const solicitudIdNumber = Number(solicitudId);
    if (isNaN(solicitudIdNumber)) {
        res.status(400).json({ message: "ID de solicitud inválido" });
        return;
    }
    try {
        logger.info(`Guardando presupuesto para la solicitud ID: ${solicitudIdNumber}, usuario: ${usuario}, archivo: ${req.file?.filename}`);
        const result = await guardarPresupuestoSolicitud(solicitudIdNumber, String(usuario), req.file!.filename);
        res.json(result);
    } catch (error: Error | any) {
        logger.error(`Error al guardar presupuesto: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

export const notificarPresupuesto = async (req: Request, res: Response) => {
    const { solicitudId, usuario, msj, asunto } = req.body;
    const solicitudIdNumber = Number(solicitudId);
    if (isNaN(solicitudIdNumber)) {
        res.status(400).json({ message: "ID de solicitud inválido" });
        return;
    }
    const solicitudDetalle = await obtenerDetalleSolicitudDeObra(solicitudIdNumber);
    try {
        await enviarEmail({
            para: solicitudDetalle.solicitud[0].SOE_EMAIL,
            empresa: 'Electrico',
            asunto: asunto,
            mensaje: msj,
            datos: solicitudDetalle.solicitud[0]
        });
        logger.info(`Notificando presupuesto para la solicitud ID: ${solicitudIdNumber}, usuario: ${usuario}`);
        const result = await notificarPresupuestoSolicitud(solicitudIdNumber, usuario, String(emailElectrico), String(solicitudDetalle.solicitud[0].SOE_EMAIL), msj, asunto, `${solicitudIdNumber}A.pdf`);
        res.status(200).json({ message: "Notificación enviada correctamente"});
    } catch (error: Error | any) {
        logger.error(`Error al notificar presupuesto: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};