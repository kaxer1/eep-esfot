import { Request, Response } from "express";
import { User } from '../interfaces/user.iterface';
import {pool} from '../database'


export const getListasEstudiante = async (req: Request, res: Response) => {
    try {

        const users: User[] = await pool.query('SELECT (nombre || \' \' || apellido) as fullname, apellido, cedula, email, nombre, estudiante, id, username, rol, sufrago, activo FROM usuario WHERE estudiante = true and rol = 2').then(result => { return result.rows })

        return res.status(200).jsonp({ cod: "OK", message: "", users});
    } catch (error) {
        return res.status(500).jsonp({ message: "Falla de la BDD" });
    }
};

export const postRegistroEstudiante = async (req: Request, res: Response) => {
    try {
        const id_est = req.userId;
        if (!id_est) return res.status(200).jsonp({ cod: "ERROR", message: "No esiste identificacion de usuario" });

        const [user] = await pool.query('UPDATE usuario SET sufrago = true WHERE id = $1 RETURNING id', [id_est]).then(result => { return result.rows })

        if (!user) return res.status(200).jsonp({ cod: "ERROR", message: "Usuario no existe" });

        return res.status(200).jsonp({ cod: "OK", message: "Voto Registrado" });
    } catch (error) {
        return res.status(500).jsonp({ message: "Falla de la BDD" });
    }
};