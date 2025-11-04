import { login } from "../controllers/auth.controller";
import { Router } from "express";
import authMiddleware from "../middleware/authCheck";
import { getTiposDeObra } from "../controllers/tipoDeObra.controller";
import { getLocalidades } from "../controllers/localidad.controller";
import { crearSolicitudDeObra, detallesSolicitudDeObra, getSolicitudesDeObra, notificarSolicitudDeObra, presupuestarSolicitudDeObra } from "../controllers/solicitudDeObra.controller";
import { enviarEmail } from "../services/notificarViaEmail.service";

const router = Router();

router.post('/login', login);

router.get('/tipos-de-obra', authMiddleware, getTiposDeObra);
router.get('/localidades', authMiddleware, getLocalidades);
router.post('/crear-solicitud', authMiddleware, crearSolicitudDeObra);
router.get('/solicitudes', authMiddleware, getSolicitudesDeObra);
router.get('/solicitud', authMiddleware, detallesSolicitudDeObra);
router.post('/presupuestar-solicitud', authMiddleware, presupuestarSolicitudDeObra);
router.post('/notificar', authMiddleware, notificarSolicitudDeObra);

router.get('/test-auth', authMiddleware, (req, res) => {
    res.json({ message: "Protected route accessed" });
});

export default router;