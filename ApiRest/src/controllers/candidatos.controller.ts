import { Request, Response } from "express";
import pool from "../database";

export const getListaCandidatos = async(req: Request, res: Response) => {
    const id_lista = req.params.id_lista;
    try {
        const LISTA_CANDIDATOS = await pool.query('SELECT * FROM candidatos WHERE id_lista = $1 ORDER BY id',[id_lista]).then(result => {
            return Promise.all(result.rows.map(async(obj) => {
                return {
                    id: obj.id,
                    candidato: obj.nombre + ' ' + obj.apellido,
                    cargo: obj.cargo,
                    id_lista: obj.id_lista
                };
            }))
        })
        if (LISTA_CANDIDATOS.length === 0) {
            return res.status(200).jsonp({message: 'No hay registros'})
        } else {
            return res.status(200).jsonp(LISTA_CANDIDATOS)
        }
    } catch (error) {
        return res.status(400).jsonp(error)
    }
    
}

export const createCandidatos = async(req: Request, res: Response) => {
    let {nombre, apellido, cargo, id_lista} = req.body
    console.log('******************************');
    console.log(nombre, apellido, cargo, id_lista);
    console.log('******************************');
    try {
        let estado = await pool.query('SELECT estado FROM lista_electoral WHERE id = $1',[id_lista]).then(result => { return result.rows[0].estado});
        console.log('ESTADO =======> ', estado);
        if (estado === true) {
            await pool.query('INSERT INTO candidatos(nombre, apellido, cargo, id_lista) VALUES($1, $2, $3, $4)', [nombre, apellido, cargo, id_lista])
            return res.status(200).jsonp({message: 'Registro guardado exitosamente'})
        } else if (estado === false) {
            return res.status(400).jsonp({message: 'Registro no guardado, la lista electoral esta desactivada'})
        } else if (estado === undefined) {
            return res.status(400).jsonp({message: 'Registro no guardado, la lista electoral no existe'})
        }
    } catch (error) {
        console.log(error);
        return res.status(400).jsonp(error)
    }
}
