import nodemailer from 'nodemailer';
import { emailAPySU, emailElectrico, emailMasComunicaiones } from '../config/email.config';
import logger from '../utils/logger';
import { Solicitud } from '../types/Solicitud.interface';
import fs from 'fs';
import path from 'path';

interface EmailParams {
    empresa: string;
    para: string;
    asunto: string;
    mensaje: string;
    datos: Solicitud;
    presupuesto?: string;
}

export const enviarEmail = async ({ empresa, para, asunto, mensaje, datos, presupuesto }: EmailParams) => {
    if (!para || !empresa || !asunto || !datos || !mensaje) {
        logger.warn('❌ Datos insuficientes para enviar el correo.');
        return new Error('Datos insuficientes para enviar el correo.');
    }
    let config;

    switch (empresa) {
        case 'APySU':
            config = emailAPySU;
            break;
        case 'Electrico':
            config = emailElectrico;
            break;
        case 'MasComunicaciones':
            config = emailMasComunicaiones;
            break;
        default:
            config = emailMasComunicaiones;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
            user: config.user,
            pass: config.pass,
        },
    });

    const html = `
    <div style="background-color:#f0f8ff;padding:30px;font-family:sans-serif;">
      <h2 style="text-align:center;color:#333;">NOTIFICACIÓN</h2>
      <div style="max-width:600px;margin:auto;background:#fff;padding:20px;border-radius:8px;">
        <p>A quien corresponda,</p>
        <p>
          Se informa que la solicitud de obra electrica N°${datos.SOE_ID},
          a nombre de <strong>${datos.SOE_NOMBRE} ${datos.SOE_APELLIDO}</strong>, ha sido actualizada con el siguiente mensaje:
        </p>
        <p><strong>${mensaje}</strong></p>
        <p style="margin-top:30px;">Saludos cordiales,<br><strong>${config.nombre}</strong></p>
        <hr style="margin-top:40px;">
        <p style="text-align:center;font-size:12px;color:#999;">Todos los derechos reservados © ${new Date().getFullYear()} Corpico Ltda.</p>
      </div>
    </div>
  `;

    const folderPath = path.join(`${process.env.NAS_PATH_PRESUPUESTOS_DEV?.replace(/\\\\/g, '\\')}`, '\\', `${datos.SOE_ID}`);
    
    let pathPresupuesto = '';

    try {
        if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath);
            // Filter files that match the pattern SOE_ID + letter (A-Z)
            const matchingFiles = files
                .filter((file: string) => {
                    const regex = new RegExp(`^${datos.SOE_ID}[A-Z]\\.pdf$`, 'i');
                    return regex.test(file);
                })
                .sort()
                .reverse(); // Sort descending to get the latest (Z, Y, X... B, A)

            if (matchingFiles.length > 0) {
                pathPresupuesto = path.join(folderPath, matchingFiles[0]);
                console.log(`Archivo de presupuesto encontrado: ${pathPresupuesto}`);
            }
        }
    } catch (error) {
        logger.warn(`⚠️ No se pudo acceder a la carpeta de presupuestos: ${error}`);
    }

    const mailOptions: any = {
        from: `"${config.nombre}" <${config.user}>`,
        to: para,
        subject: asunto,
        html
    };

    mailOptions.attachments = [
        {
            filename: `Presupuesto_${datos.SOE_ID}.pdf`,
            path: pathPresupuesto
        }
    ];
    // if (pathPresupuesto) {
    // }

    try {
        await transporter.sendMail(mailOptions);
        logger.info(`📨 Email enviado a ${para} desde ${config.nombre}`);
        return true;
    } catch (error) {
        logger.error(`💥 Error al enviar email desde ${config.nombre}:`, error instanceof Error ? error.message : String(error));
        return false;
    }
};