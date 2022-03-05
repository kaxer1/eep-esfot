import { Request, Response } from "express";
import {pool} from "../database";

export const getListaCandidatos = async (req: Request, res: Response) => {
    const id_lista = req.params.id_lista;
    try {
        const LISTA_CANDIDATOS = await pool.query('SELECT c.*, ( nombre || \' \' || apellido) as candidato FROM candidatos c WHERE id_lista = $1 ORDER BY id', [id_lista]).then(result => {
            return result.rows
        })
        if (LISTA_CANDIDATOS.length === 0) {
            return res.status(200).jsonp({ cod: "ERROR", message: 'No hay registros' })
        } else {
            return res.status(200).jsonp({ cod: "OK", message: "Lista de candidatos", LISTA_CANDIDATOS })
        }
    } catch (error) {
        return res.status(500).jsonp({ message: 'Fallo en la BDD' });
    }

}

export const createCandidato = async (req: Request, res: Response) => {
    try {
        let { nombre, apellido, cargo, id_lista } = req.body
        let estado = await pool.query('SELECT estado FROM lista_electoral WHERE id = $1', [id_lista]).then(result => { return result.rows[0].estado });
        
        if (estado === true) {
            await pool.query('INSERT INTO candidatos(nombre, apellido, cargo, id_lista) VALUES($1, $2, $3, $4)', [nombre, apellido, cargo, id_lista])
            return res.status(200).jsonp({ cod: "OK", message: 'Registro guardado exitosamente' })
        } else if (estado === false) {
            return res.status(200).jsonp({ cod: "ERROR", message: 'Registro no guardado, la lista electoral esta desactivada' })
        } else if (estado === undefined) {
            return res.status(200).jsonp({ cod: "ERROR", message: 'Registro no guardado, la lista electoral no existe' })
        }
    } catch (error) {
        return res.status(500).jsonp({ message: 'Fallo en la BDD' });
    }
}

export const updateCandidato = async (req: Request, res: Response) => {
    try {
        let {id, nombre, apellido, cargo, id_lista } = req.body;
        let estado = await pool.query('SELECT estado FROM lista_electoral WHERE id = $1', [id_lista]).then(result => { return result.rows[0].estado });
        
        if (estado === true) {
            const query = `UPDATE candidatos SET nombre = $2, apellido = $3, cargo = $4 WHERE id = $1 RETURNING id`
            const resultado = await pool.query( query, [id, nombre, apellido, cargo] ).then(result => { return result.rows})
            return res.status(200).jsonp({ cod: "OK", message: 'Registro guardado exitosamente', resultado})
        } else if (estado === false) {
            return res.status(200).jsonp({ cod: "ERROR", message: 'Registro no guardado, la lista electoral esta desactivada' })
        } else if (estado === undefined) {
            return res.status(200).jsonp({ cod: "ERROR", message: 'Registro no guardado, la lista electoral no existe' })
        }
    } catch (error) {
        return res.status(500).jsonp({ message: 'Fallo en la BDD' });
    }
}
