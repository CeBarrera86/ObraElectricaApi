import { Request, Response } from "express";
import logger from "../utils/logger";
import exec from 'child_process';

export const ejecutarClarion = async (req: Request, res: Response) => {
    try {
        exec.exec(`"C:\\wndScanning\\wndScanningProtocol:${req.body.solicitudId}:${req.body.usuario}"`, (error, stdout, stderr) => {
            if (error) {
                logger.error("Error al ejecutar Clarion:", error);
                res.status(500).json({ message: "Error al ejecutar Clarion", error });
                return;
            }
            logger.info("Clarion ejecutado exitosamente");
            res.status(200).json({ message: "Clarion ejecutado exitosamente", output: stdout });
        });
    } catch (error) {
        logger.error("Error al ejecutar Clarion:", error);
        res.status(500).json({ message: "Error al ejecutar Clarion", error });
    }
};