export interface Usuario {
    USU_CODIGO: string
    USU_NOMBRE: string
    USU_APELLIDO: string
    USU_PASSWORD: string
    USU_PASSWORD1: string | null
    USU_PASSWORD2: string | null
    USU_FECULPW: Date | null
    USU_FECALT: Date
    USU_CUENTA: boolean
    USU_CTADIA: Date | null
    USU_SUSPEN: boolean
    USU_PWLOG: boolean
    USU_PWEXP: boolean
    USU_CANT_FALLIDOS: number
    USU_FECSUSP: Date | null
    USU_CODSEC: number
    USU_CODZON: number
    USU_ADMSEG: boolean
    USU_IMAGEN: Blob | null
    USU_AUTORIZACION: number
    USU_PCDEFECTO: string
    USU_HORADES: string
    USU_HORAHAS: string
    USU_MAILTRA: string | null
    USU_MAILPER: string | null
    USU_MAILPAG: string | null
    USU_TAG1: string | null
    USU_TAG2: string | null
    USU_TAG3: string | null
    USU_TAG4: string | null
    USU_TAG5: string | null
    USU_TAG6: string | null
    USU_TAG7: string | null
    USU_TAG8: string | null
    USU_OBSERVACIONES: string | null
    USU_ACTIVO: boolean
    USU_ID_USER: string
    USU_FECHA_UPDATE: Date
}