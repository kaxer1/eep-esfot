export interface Proceso {
    id: number,
    descripcion: string,
    estado: boolean,
    semestre: string,
    fec_eleccion: string,
    hora_inicio: string,
    hora_final: string,
    lista_electoral?: Lista_electoral[]
}

export interface Lista_electoral {
    id: number,
    nom_lista: string,
    descripcion: string,
    logo: string,
    estado: boolean,
    id_proceso: number
}

export interface msgEmail {
    from: string,
    to: string,
    subject: string,
    html: string,
    generateTextFromHTML?: boolean,
    text?: string,
    amp?: string
};