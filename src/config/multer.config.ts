// src/config/multer.config.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ruta de tu NAS (ajusta según tu sistema)
const NAS_PATH = '\\\\172.16.14.27\\sistema\\atp - tecnica\\Solicitudes';

// Asegurarse que la carpeta existe
if (!fs.existsSync(NAS_PATH)) {
  fs.mkdirSync(NAS_PATH, { recursive: true });
}

// Configuración del storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, NAS_PATH);
  },
  filename: (req, file, cb) => {
    // Usar solicitudId del query como nombre del archivo
    const solicitudId = req.query.solicitudId as string;
    const ext = path.extname(file.originalname);
    cb(null, `PRUEBA SISTEMAS - ${solicitudId}${ext}`);
  }
});

// Filtro de tipos de archivo (opcional)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Permitir solo ciertos tipos de archivo
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|txt/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'));
  }
};

// Exportar configuración de Multer
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  // fileFilter: fileFilter // Descomenta si quieres filtrar tipos
});