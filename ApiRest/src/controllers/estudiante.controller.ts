import { Request, Response } from "express";
import { User, UsuarioAtributos } from '../interfaces/user.iterface';
import { pool } from '../database'
import { Usuario } from "../models/Usuario.model";
import { secuencia } from '../libs/seguridad';

/**
 * Metodo para listar estudiantes
 * @param req Request de la peticion del frontend
 * @param res Response que se envia al frontend
 * @returns mensaje estado
 */
export const getListasEstudiante = async (req: Request, res: Response) => {
    try {

        const users: User[] = await pool.query('SELECT (nombre || \' \' || apellido) as fullname, apellido, cedula, email, nombre, estudiante, id, username, rol, sufrago, activo FROM usuario').then(result => { return result.rows })

        return res.status(200).jsonp({ cod: "OK", message: "", users});
    } catch (error) {
        return res.status(500).jsonp({ message: "Falla de la BDD" });
    }
};

/**
 * Metodo para crear estudiante/usuario
 * @param req Request de la peticion del frontend
 * @param res Response que se envia al frontend
 * @returns mensaje estado
 */
export const createEstudiante = async (req: Request, res: Response) => {
    try {
        let usuario: UsuarioAtributos= req.body;
        let sec: number = await secuencia('usuario','id')
        sec = sec + 1;
        usuario.id = sec;
        usuario.createdat = new Date();

        await Usuario.create(usuario,{ returning: false});

        return res.status(200).jsonp({ cod: "OK", message: "Estudiante registrado" });
    } catch (error) {
        return res.status(500).jsonp({ message: "Falla de la BDD" });
    }
};

/**
 * Metodo para actualizar estudiante/usuario
 * @param req Request de la peticion del frontend
 * @param res Response que se envia al frontend
 * @returns mensaje estado
 */
 export const updateEstudiante = async (req: Request, res: Response) => {
    try {

        let usuario: UsuarioAtributos= req.body;
        
        if (usuario == null) {
            return res.status(200).jsonp({ cod: "ERROR", message: "Usuario no encontrado" });
        }
        usuario.updatedat = new Date();
        await Usuario.update(usuario, { where: { id: usuario.id } });

        return res.status(200).jsonp({ cod: "OK", message: "Estudiante actualizado" });
    } catch (error) {
        return res.status(500).jsonp({ message: "Falla de la BDD" });
    }
}