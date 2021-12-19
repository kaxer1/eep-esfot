import { Request, Response } from "express";
import blockchain from "../libs/blockchain";
import pool from '../database'

// voto blockchain
export const registrarVoto = async (req: Request, res: Response) => {
    try {
        const id_est = req.userId;
        if (!id_est) return res.status(200).jsonp({ cod: "ERROR", message: "No esiste identificacion de usuario" });

        const [user] = await pool.query('UPDATE usuario SET sufrago = true WHERE id = $1 RETURNING id', [id_est]).then(result => { return result.rows })

        if (!user) return res.status(200).jsonp({ cod: "ERROR", message: "Usuario no existe" });

        blockchain.crearNuevoBloque(req.body);

        return res.status(200).jsonp({ cod: "OK", message: "Voto Registrado" });
    } catch (error) {
        return res.status(500).jsonp({ message: "Falla de la BDD" });
    }
};

export const verVotos = (req: Request, res: Response) => {

    return res.status(200).jsonp(blockchain.imprimir());
}