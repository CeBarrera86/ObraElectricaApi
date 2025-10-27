export interface EmailSolicitud {
    EMSO_ID: number
    EMSO_SOLICITUD_ID: number
    EMSO_ORIGEN: string
    EMSO_DESTINO: string
    EMSO_ASUNTO: string
    EMSO_MENSAJE: string | null
    EMSO_ADJUNTO: string | null
    EMSO_USUARIO: string
    EMSO_FECHA: Date | null
}