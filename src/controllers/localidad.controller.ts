import { Request, Response } from "express";
import { getLocalidadesFromDB } from "../models/localidad.model";
import logger from "../utils/logger";

export const getLocalidades = async (req: Request, res: Response) => {
    logger.info("Fetching localidades");
    try {
        const localidades = await getLocalidadesFromDB();
        res.status(200).json({ data: localidades });
    } catch (error) {
        logger.error("Error fetching localidades:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
