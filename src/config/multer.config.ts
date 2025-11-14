// src/config/multer.config.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ruta de tu NAS (ajusta según tu sistema)
const Solicitudes = '\\\\172.16.14.27\\sistema\\atp - tecnica\\Solicitudes';
const Presupuestos = '\\\\172.16.14.27\\sistema\\atp - tecnica\\Presupuestos';


const solicitudesConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const solicitudId = req.query.solicitudId as string;
    const solicitudPath = path.join(Solicitudes, solicitudId);
    try {
      // Create directory synchronously
      fs.mkdirSync(solicitudPath, { recursive: true });
      cb(null, solicitudPath);
    } catch (err) {
      cb(err as Error, '');
    }
  },
  filename: (req, file, cb) => {
    const solicitudId = req.query.solicitudId as string;
    const ext = path.extname(file.originalname);
    const solicitudPath = path.join(Solicitudes, solicitudId);

    // Find existing files and determine next letter
    try {
      const files = fs.readdirSync(solicitudPath);
      const existingFiles = files.filter(f => f.startsWith(solicitudId));
      const letter = String.fromCharCode(65 + existingFiles.length); // A, B, C, etc.
      
      cb(null, `${solicitudId}${letter}${ext}`);
    } catch (err) {
      // If directory doesn't exist yet, start with A
      cb(null, `${solicitudId}A${ext}`);
    }
  }
});

const presupuestosConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const solicitudId = req.query.solicitudId as string;
    const presupuestoPath = path.join(Presupuestos, solicitudId);
    try {
      // Create directory synchronously
      fs.mkdirSync(presupuestoPath, { recursive: true });
      cb(null, presupuestoPath);
    } catch (err) {
      cb(err as Error, '');
    }
  },
  filename: (req, file, cb) => {
    const solicitudId = req.query.solicitudId as string;
    const ext = path.extname(file.originalname);
    const presupuestoPath = path.join(Presupuestos, solicitudId);

    // Find existing files and determine next letter
    try {
      const files = fs.readdirSync(presupuestoPath);
      const existingFiles = files.filter(f => f.startsWith(solicitudId));
      const letter = String.fromCharCode(65 + existingFiles.length); // A, B, C, etc.
      
      cb(null, `${solicitudId}${letter}${ext}`);
    } catch (err) {
      // If directory doesn't exist yet, start with A
      cb(null, `${solicitudId}A${ext}`);
    }
  }
});

// Filtro de tipos de archivo (opcional)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Permitir solo ciertos tipos de archivo
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'));
  }
};

// Exportar configuración de Multer
export const solicitudes = multer({
  storage: solicitudesConfig,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: fileFilter // Descomenta si quieres filtrar tipos
});
// Exportar configuración de Multer
export const presupuestos = multer({
  storage: presupuestosConfig,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: fileFilter // Descomenta si quieres filtrar tipos
});