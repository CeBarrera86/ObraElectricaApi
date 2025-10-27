export interface Presupuesto {
    PSO_ID: number
    PSO_NOTIFICA: boolean | null
    PSO_VECES: number | null
    PSO_USU_NOTIFICA: string | null
    PSO_F_NOTIFICA: Date | null
    PSO_ACEPTA: boolean | null
    PSO_F_ACEPTA: Date | null
    PSO_USU_ACEPTA: Date | null
    PSO_PATH: string
}