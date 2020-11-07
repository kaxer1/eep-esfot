export interface IProcesoElectoral {
    id: number;
    descripcion: string;
    estado: string;
    semestre: string;
    fec_eleccion: string;
}

export interface ICandidatos {
  id: number;
  candidato: string;
  cargo: string;
  id_lista?: number;
}