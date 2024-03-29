import { Request, Response } from "express";
import { Lista_electoral, Proceso } from "interfaces/proceso.interface";
import { Blockchain } from "../libs/blockchain";
import {pool} from '../database'

export const RegistrarProceso = async (req: Request, res: Response) => {

    let { descripcion, semestre, fec_eleccion, hora_inicio, hora_final } = req.body

    try {
        const [proceso] = await pool.query('INSERT INTO proceso_electoral(descripcion, semestre, fec_eleccion, hora_inicio, hora_final) VALUES($1, $2, $3, $4, $5) RETURNING id', [descripcion, semestre, fec_eleccion, hora_inicio, hora_final]).then(result => { return result.rows })
        
        if (!proceso) return res.status(200).jsonp({ cod: "ERROR", message: "El proceso no se registro" });
        
        let bc = new Blockchain();
        bc.crearArchivoGenesis(semestre + descripcion.trim());
        return res.status(200).jsonp({ cod: "OK", message: 'Se registro el proceso' });
    } catch (error) {
        return res.status(500).jsonp({ message: 'Fallo en la BDD' });
    }
}

export const ActualizarProceso = async (req: Request, res: Response) => {
    
    let { id, descripcion, semestre, fec_eleccion, hora_inicio, hora_final } = req.body

    try {
        const [proceso] = await pool.query('UPDATE proceso_electoral SET descripcion = $1, semestre = $2, fec_eleccion = $3, hora_inicio = $4, hora_final = $5 WHERE id = $6 RETURNING id', [descripcion, semestre, fec_eleccion, hora_inicio, hora_final, id]).then(result => { return result.rows })
        
        if (!proceso) return res.status(200).jsonp({ cod: "ERROR", message: "El proceso no se actializo" });
        let bc = new Blockchain();
        bc.crearArchivoGenesis(semestre + descripcion.trim());
        return res.status(200).jsonp({ cod: "OK", message: 'Se actualizo el proceso' });
    } catch (error) {
        return res.status(500).jsonp({ message: 'Fallo en la BDD' });
    }
}

export const ObtenerProcesosElectorales = async (req: Request, res: Response) => {

    let datosConsulta: any[] = await pool.query('SELECT * FROM proceso_electoral')
        .then(result => {
            return result.rows.map(obj => {
                if (obj.estado === true) {
                    obj.estado = 'vijente'
                } else if (obj.estado === false) {
                    obj.estado = 'pasado'
                }
                return obj
            })
        });

    return res.status(200).jsonp({ cod: "OK", message: "", procesos: datosConsulta });
}

export const infoProcesoToUsuarios = async (req: Request, res: Response) => {

    try {
        let [proceso] = await pool.query('SELECT * FROM proceso_electoral WHERE estado = true ORDER BY fec_eleccion DESC LIMIT 1')
            .then(result => {
                const proceso: Proceso[] = result.rows
                return proceso
            });

        if (!proceso) return res.status(200).jsonp({ cod: "ERROR", message: "No hay procesos electorales activos" });
    
        proceso.lista_electoral = await pool.query('SELECT * FROM lista_electoral WHERE id_proceso = $1', [proceso.id])
            .then(result => {
                const lista: Lista_electoral[] = result.rows
                return lista
            })

        return res.status(200).jsonp({ cod: "OK", message: "Transaccion exitosa", PROCESO: proceso });
    } catch (error) {
        return res.status(500).jsonp({ message: 'Fallo en la BDD' });
    }
}

