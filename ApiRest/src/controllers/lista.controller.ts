import { Request, Response } from "express";
import pool from "../database";
import path from 'path';
import {ImagenBase64LogosEmpresas} from '../libs/multer'

export const subirImageLista = async(req: Request, res: Response) => {
    
    const logo = req.file.filename; 
    const id_lista = req.params.id_lista;
    console.log('*******************');
    console.log(logo);
    console.log(req.file.path);
    console.log(req.file);
    console.log(req.params);
    console.log('*******************');
    
    await pool.query('UPDATE lista_electoral SET logo = $1 WHERE id = $2', [logo, id_lista])

    return res.json({message: 'Foto guardada'});
}

export const getListasElectoral = async(req: Request, res: Response) => {
    const id_proceso = req.params.id_proceso;
    try {
        const LISTA = await pool.query('SELECT * FROM lista_electoral WHERE id_proceso = $1 ORDER BY id',[id_proceso]).then(result => {
            return Promise.all(result.rows.map(async(obj) => {
                obj.logo = await ImagenBase64LogosEmpresas(obj.logo)
                // console.log(obj.logo);
                // console.log(ImagenBase64LogosEmpresas(obj.logo))
                return obj;
            }))
        })
        if (LISTA.length === 0) {
            return res.status(200).jsonp({message: 'No hay registros'})
        } else {
            return res.status(200).jsonp(LISTA)
        }
    } catch (error) {
        return res.status(400).jsonp(error)
    }
    
}

export const getAudio = async (req: Request, res: Response) => {

    res.sendFile(path.resolve('uploads') + "//track1.mp3")
}

export const createListas = async (req: Request, res: Response) => {
    console.log(req.body);
    const {nom_lista, descripcion, estado, id_proceso} = req.body;
    try {

        await pool.query('INSERT INTO lista_electoral(nom_lista, descripcion, estado, id_proceso) VALUES($1, $2, $3, $4)', [nom_lista, descripcion, estado, id_proceso]);

        return res.status(200).jsonp({ 
            id: await pool.query('SELECT MAX(id) FROM lista_electoral').then(result => {
                    return result.rows.map(obj => {
                        console.log(obj.max);
                        return obj.max
                    })[0];
                }),
            message: 'Registro ingresado con éxito'
            })
    } catch (error) {
        console.log(error);
        return res.status(400).jsonp(error)
    }
    
}

// export const getImageLista = async(req: Request, res: Response) => {
//     const filename = req.params.logo;
//     res.sendFile(path.resolve('uploads') + '//' + filename)
// }