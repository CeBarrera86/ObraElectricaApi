import { login } from "../controllers/auth.controller";
import { Router } from "express";
import authMiddleware from "../middleware/authCheck";
import { getTiposDeObra } from "../controllers/tipoDeObra.controller";
import { getLocalidades } from "../controllers/localidad.controller";
import { crearSolicitudDeObra, detallesSolicitudDeObra, getSolicitudesDeObra, notificarSolicitudDeObra, presupuestarSolicitudDeObra } from "../controllers/solicitudDeObra.controller";
import { ejecutarClarion } from "../controllers/clarion.controller";
import { upload } from "../config/multer.config";

const router = Router();

router.post('/login', login);

router.get('/tipos-de-obra', authMiddleware, getTiposDeObra);
router.get('/localidades', authMiddleware, getLocalidades);
router.post('/crear-solicitud', authMiddleware, crearSolicitudDeObra);
router.get('/solicitudes', authMiddleware, getSolicitudesDeObra);
router.get('/solicitud', authMiddleware, detallesSolicitudDeObra);
router.post('/presupuestar-solicitud', authMiddleware, upload.single('presupuesto'), presupuestarSolicitudDeObra);
router.post('/notificar', authMiddleware, notificarSolicitudDeObra);
router.post('/ejecutar-clarion', authMiddleware, ejecutarClarion);

router.get('/test-auth', authMiddleware, (req, res) => {
    res.json({ message: "Protected route accessed" });
});

export default router;