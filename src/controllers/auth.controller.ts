import { Request, Response } from 'express';
import { getPool } from "../config/db";
import { Usuario } from 'types/Usuario.interface';
import { codificar } from '../services/pass.service';
import jwt from 'jsonwebtoken';
import logger, { logAuth } from '../utils/logger';
import { log } from 'console';

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
    logger.info('Login attempt from user: ' + username);
    const db = await getPool('GeaSeguridad');
    let data;
    let userData: Usuario;
    let token: string;
    // Validate user and password
    if (!username || !password) {
        logger.warn('Login attempt failed: Missing user or password');
        return res.status(400).json({ message: 'User and password are required' });
    }
    try {
        data = await db.query(`SELECT * FROM usuarios where USU_codigo like \'%${username}%\'`);
        if (data.recordset.length === 0) {
            logger.warn('Login attempt failed: User not found - ' + username);
            return res.status(401).json({ message: 'Invalid user or password' });
        }
        userData = data.recordset[0];
        const hashPass = codificar(password);
        if (userData.USU_PASSWORD !== hashPass) {
            logger.warn('Login attempt failed: Incorrect password for user - ' + username);
            return res.status(401).json({ message: 'Invalid user or password' });
        }
    } catch (error) {
        logger.error('Login attempt failed: ' + error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    try {
        token = jwt.sign(
            { username: username },
            process.env.JWT_SECRET || '',
            { expiresIn: '1h' }
        );
    } catch (error) {
        logger.error('Token generation failed for user ' + username + ': ' + error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    logAuth('Login successful for user: ' + username);
    return res.status(200).json({ message: 'Login successful', token: token, name: userData.USU_NOMBRE });
};