import { Request, Response } from "express";
import pool from '../database'

export const RegistrarProceso = async (req: Request, res: Response) => {
    // let {descripcion,semestre,fec_eleccion} = req.body
    let {descripcion,semestre,fec_eleccion} = req.body
    console.log(descripcion,semestre,fec_eleccion);

    try {
        await pool.query('INSERT INTO proceso_electoral(descripcion, semestre, fec_eleccion) VALUES($1, $2, $3)',[descripcion,semestre,fec_eleccion])
        res.jsonp({message: 'Se guardo el proceso'});
    } catch (error) {
        console.log(error);
        res.status(400).jsonp({message: 'No se ha guardado el registro, revise la información ingresada.'});
    }    
}

export const ObtenerProcesosElectorales = async (req: Request, res: Response) => {
    
    let datosConsulta: any[] = await pool.query('SELECT * FROM proceso_electoral')
    .then(result => {return result.rows.map(obj => {
        if (obj.estado === true) {
            obj.estado = 'vijente'
        } else if (obj.estado === false) {
            obj.estado = 'pasado'
        }
        return obj
    })});
    
    if (datosConsulta.length === 0 ) return res.status(400).jsonp({message: 'No tienen registros de procesos'});

    res.status(200).jsonp(datosConsulta);
}