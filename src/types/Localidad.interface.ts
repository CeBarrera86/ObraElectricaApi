export interface Localidad {
    LOC_ID: number
    LOC_DESCRIPCION: string
    LOC_MUNICIPIO: number
    LOC_INFORMA_SUCURSAL: boolean | null
    LOC_SUCURSAL: number | null
    LOC_ZONA_TARIFARIA: number | null
    LOC_ACTIVO: boolean
    LOC_ID_USER: string
    LOC_FECHA_UPDATE: Date
    LOC_LOTE_REPLICACION: number
}