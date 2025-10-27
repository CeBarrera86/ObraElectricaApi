export interface Solicitud {
    SOE_ID: number
    SOE_CUIT: string
    SOE_APELLIDO: string
    SOE_NOMBRE: string
    SOE_CALLE: string
    SOE_ALTURA: string
    SOE_PISO: string | null
    SOE_DPTO: string | null
    SOE_LOCALIDAD_ID: number
    SOE_CELULAR: string | null
    SOE_EMAIL: string | null
    SOE_TIPO_ID: number
    SOE_SUBESTACION: string | null
    SOE_ASOCIADO: number | null
    SOE_SUMINISTRO: number | null
    SOE_OBRA: string | null
    SOE_USUARIO: string
    SOE_FECHA: Date
    SOE_UPDATE: Date
    SOE_PATH: string | null
}
export interface SolicitudRequest {
    cuit: string
    apellido: string
    nombre: string
    calle: string
    altura: string
    piso?: string | null
    dpto?: string | null
    localidad: number
    celular?: string | null
    email?: string | null
    tipo: number
    subestacion?: string | null
    asociado?: number | null
    path?: string | null
}