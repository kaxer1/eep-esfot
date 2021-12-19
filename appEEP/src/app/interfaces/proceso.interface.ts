export interface ProcesoResp {
    cod: string,
    message: string,
    PROCESO: Proceso
}

export interface Proceso {
    id: number,
    descripcion: string,
    estado: boolean,
    semestre: string,
    fec_eleccion: Date,
    lista_electoral?: Lista_electoral[]
}

export interface Lista_electoral {
    id: number,
    nom_lista: string,
    descripcion: string,
    logo: string,
    estado: boolean,
    id_proceso: number,
}

export const procesoValueDefault = {
    id: undefined,
    descripcion: undefined,
    estado: undefined,
    semestre: undefined,
    fec_eleccion: undefined,
    lista_electoral: []
}