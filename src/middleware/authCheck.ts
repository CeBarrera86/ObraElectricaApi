import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import logger from "../utils/logger";

const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : undefined;
    const devOverride = process.env.DEV_AUTH_OVERRIDE === 'true';
    if (devOverride) {
        logger.warn('DEV_AUTH_OVERRIDE is enabled - skipping authentication');
        return next();
    }
    if (!token) {
        logger.warn('No token provided');
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        // Verify token (you can use a library like jsonwebtoken)
        jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        // You can attach decoded info to req.user if needed
        return next();
    } catch (error) {
        logger.warn('Invalid token: ' + error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;