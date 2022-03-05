import { Request, Response } from "express";
import {pool} from "../database";
import path from 'path';
import { ImagenBase64LogosEmpresas } from '../libs/multer'

export const subirImageLista = async (req: Request, res: Response) => {

    try {
        const l:any = req['files'];
        const logo = l.filename;
        const id_lista = req.params.id_lista;
        await pool.query('UPDATE lista_electoral SET logo = $1 WHERE id = $2', [logo, id_lista])
    
        return res.status(200).jsonp({ cod: "OK", message: 'Foto guardada' });
    } catch (error) {
        return res.status(500).jsonp({ message: 'Fallo en la subida de la imagen' });
    }
}

export const getListasElectoral = async (req: Request, res: Response) => {
    const id_proceso = req.params.id_proceso;
    try {
        const LISTA = await pool.query('SELECT * FROM lista_electoral WHERE id_proceso = $1 ORDER BY id', [id_proceso]).then(result => {
            return Promise.all(result.rows.map(async (obj) => {
                obj.logo = await ImagenBase64LogosEmpresas(obj.logo)
                // console.log(obj.logo);
                // console.log(ImagenBase64LogosEmpresas(obj.logo))
                return obj;
            }))
        })
        if (LISTA.length === 0) {
            return res.status(200).jsonp({ cod: "OK", message: 'Agregar lista de postulantes' })
        } else {
            return res.status(200).jsonp({ cod: "OK", message: "Lista de candidatos", LISTA })
        }
    } catch (error) {
        return res.status(500).jsonp({ message: 'Fallo en la BDD' });
    }

}

export const getAudio = async (req: Request, res: Response) => {

    res.sendFile(path.resolve('uploads') + "//track1.mp3")
}

export const createListas = async (req: Request, res: Response) => {
    console.log(req.body);
    const { nom_lista, descripcion, estado, id_proceso } = req.body;
    try {

        const lista = await pool.query('INSERT INTO lista_electoral(nom_lista, descripcion, estado, id_proceso) VALUES($1, $2, $3, $4) RETURNING id', [nom_lista, descripcion, estado, id_proceso]);

        return res.status(200).jsonp({
            id: (lista.rows.length > 0) ? lista.rows[0].id : null,
            cod: "OK",
            message: 'Registro ingresado con éxito'
        })
    } catch (error) {
        return res.status(500).jsonp({ message: 'Fallo en la BDD' });
    }

}

// export const getImageLista = async(req: Request, res: Response) => {
//     const filename = req.params.logo;
//     res.sendFile(path.resolve('uploads') + '//' + filename)
// }