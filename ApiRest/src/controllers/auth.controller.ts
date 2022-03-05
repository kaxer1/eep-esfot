import { Request, Response } from "express";
import {pool} from "../database";
import jwt from "jsonwebtoken";
import { User } from '../interfaces/user.iterface';
import { Proceso } from '../interfaces/proceso.interface';
import { sacarmenu } from "../libs/seguridad";

/**
 * Login del sistema
 * @param req Request de la peticion del frontend
 * @param res Response que se envia al frontend
 * @returns usuario, menu logeado
 */
export const signin = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        if (email === undefined || email === null || email === '') return res.status(200).jsonp({ cod: "ERROR", message: "Usuario indefinido" });
        if (password === undefined || password === null || password === '') return res.status(200).jsonp({cod: "ERROR", message: "Password indefinido" });

        // busca usuario activo.
        let user = await pool.query('SELECT (nombre || \' \' || apellido) as fullname, * FROM usuario WHERE email = $1 AND password = $2 AND activo = true', [email, password])
            .then(result => {
                return result.rows[0]
            }) as User;

        if (user) {
            user.password = '';
            let menu = await sacarmenu(user.rol);
            
            let token;
            if (user.estudiante === true ) {
                if (user.sufrago === true) return res.status(200).jsonp({ cod: "ERROR", message: "Usuario ya sufrago." });
                let proceso = await pool.query('SELECT * FROM proceso_electoral WHERE estado = true ORDER BY fec_eleccion DESC LIMIT 1')
                .then(result => { return result.rows }) as Proceso[];
                // token = jwt.sign({ _id: user.id, rol: user.rol }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: 60 * 5 });
                token = jwt.sign({ _id: user.id, rol: user.rol, proceso, menu }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: 60 * 60 * 24 }); // solo para pruebas.
            } else {
                token = jwt.sign({ _id: user.id, rol: user.rol, menu }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: 60 * 60 * 24 });
            }

            user.iniciales = (user.nombre !== "") ? user.nombre.slice(0, 1) : '';
            user.iniciales = (user.apellido !== "") ? user.iniciales + user.apellido.slice(0, 1) : '';

            return res.status(200).jsonp({ cod: "OK", message: "Ingreso Exitoso", user: user, menu, authorization: token });
        }

        return res.status(200).jsonp({ cod: "ERROR", message: "Email o contraseña incorrectos" });
    } catch (error) {
        return res.status(500).jsonp({ message: "Error al ingresar" });
    }

};

/**
 * Consulta el menu del rol 
 * @param req Request de la peticion del frontend
 * @param res Response que se envia al frontend
 * @returns arreglo del menu
 */
export const consultarMenu = async (req: Request, res: Response) => {
    
    try {
        let menu = await sacarmenu(req.userRol);
        return res.status(200).jsonp({ cod: "OK", message: "", menu });
    } catch (error) {
        return res.status(500).jsonp({ message: "Error al ingresar" });
    }
}