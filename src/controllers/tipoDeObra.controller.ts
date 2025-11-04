import { getTiposDeObraFromDB } from "../models/tipoDeObra.model";
import { Request, Response } from "express";
import logger from "../utils/logger";

export const getTiposDeObra = async (req: Request, res: Response): Promise<Response> => {
    logger.info('Fetching tipos de obra');
    try {
        const tiposDeObra = await getTiposDeObraFromDB();
        return res.status(200).json({data: tiposDeObra});
    } catch (error) {
        logger.error('Error fetching tipos de obra: ' + error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};