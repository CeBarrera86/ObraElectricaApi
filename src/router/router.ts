import { login } from "../controllers/auth.controller";
import { Router } from "express";
import authMiddleware from "../middleware/authCheck";
import { getTiposDeObra } from "../controllers/tipoDeObra.controller";
import { getLocalidades } from "../controllers/localidad.controller";
import { crearSolicitudDeObra, detallesSolicitudDeObra, getSolicitudesDeObra, acreditarSolicitudDeObra } from "../controllers/solicitudDeObra.controller";
import { presupuestos, solicitudes } from "../config/multer.config";
import { notificarPresupuesto, presupuestarSolicitud } from "../controllers/presupuesto.controller";

const router = Router();

router.post('/login', login);

router.get('/tipos-de-obra', authMiddleware, getTiposDeObra);
router.get('/localidades', authMiddleware, getLocalidades);
router.post('/crear-solicitud', authMiddleware, crearSolicitudDeObra);
router.get('/solicitudes', authMiddleware, getSolicitudesDeObra);
router.get('/solicitud', authMiddleware, detallesSolicitudDeObra);
router.post('/acreditar-solicitud', authMiddleware, solicitudes.single('solicitud'), acreditarSolicitudDeObra);
router.post('/presupuestar-solicitud', authMiddleware, presupuestos.single('presupuesto'), presupuestarSolicitud);
router.post('/notificar', authMiddleware, notificarPresupuesto);

router.get('/test-auth', authMiddleware, (req, res) => {
    res.json({ message: "Protected route accessed" });
});

export default router;