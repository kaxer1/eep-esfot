import { Request, Response } from "express";
import { Blockchain } from "../libs/blockchain";
import {pool} from '../database'
import { Proceso } from '../interfaces/proceso.interface';

let BLOCK_CHAIN: Blockchain;
// voto blockchain
export const registrarVoto = async (req: Request, res: Response) => {
    try {
        const id_est = req.userId;
        if (!id_est) return res.status(200).jsonp({ cod: "ERROR", message: "No esiste identificacion de usuario" });

        const [user] = await pool.query('UPDATE usuario SET sufrago = true WHERE id = $1 RETURNING id', [id_est]).then(result => { return result.rows })

        if (!user) return res.status(200).jsonp({ cod: "ERROR", message: "Usuario no existe" });

        BLOCK_CHAIN = new Blockchain();
        const [proceso]: Proceso[] = req.proceso;
        const filename = proceso.semestre + proceso.descripcion;
        await BLOCK_CHAIN.getDataArchivo(filename)
        BLOCK_CHAIN.crearNuevoBloque(filename, req.body);

        return res.status(200).jsonp({ cod: "OK", message: "Voto Registrado" });
    } catch (error) {
        return res.status(500).jsonp({ cod: "ERROR", message: "Falla de la BDD" });
    }
};

export const verVotos = async(req: Request, res: Response) => {

    try {
        BLOCK_CHAIN = new Blockchain(); 
        const [proceso]: Proceso[] = req.proceso;
        await BLOCK_CHAIN.getDataArchivo(proceso.semestre + proceso.descripcion)
        return res.status(200).jsonp(BLOCK_CHAIN.imprimir());
    } catch (error) {
        return res.status(500).jsonp({ message: "Falla de la respuesta del archivo" });
    }
}