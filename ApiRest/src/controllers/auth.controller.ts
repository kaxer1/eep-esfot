import { Request, Response } from "express";
import pool from "../database";
import jwt from "jsonwebtoken";
import { User } from '../interfaces/user.iterface';
import { Proceso } from '../interfaces/proceso.interface';

// login
export const signin = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        if (email === undefined || email === null || email === '') return res.status(400).jsonp({ message: "Usuario indefinido" });
        if (password === undefined || password === null || password === '') return res.status(400).jsonp({ message: "Password indefinido" });

        // busca usuario si tiene acesso a sufragar en el proceso.
        let user = await pool.query('SELECT id, username, (nombre || \' \' || apellido) as fullname, nombre, apellido, email, rol, sufrago FROM usuario WHERE email = $1 AND password = $2 AND estado = true', [email, password])
            .then(result => {
                return result.rows[0]
            }) as User;

        if (user) {

            if (user.sufrago === true) return res.status(200).jsonp({ cod: "ERROR", message: "Usuario ya sufrago." });

            let token;
            if (user.rol === 1) {
                token = jwt.sign({ _id: user.id, rol: user.rol }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: 60 * 60 * 24 });
            } else if (user.rol === 2) {
                let proceso = await pool.query('SELECT * FROM proceso_electoral WHERE estado = true ORDER BY fec_eleccion DESC LIMIT 1')
                    .then(result => { return result.rows }) as Proceso[];
                // token = jwt.sign({ _id: user.id, rol: user.rol }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: 60 * 5 });
                token = jwt.sign({ _id: user.id, rol: user.rol, proceso }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: 60 * 60 * 24 }); // solo para pruebas.
            }

            user.iniciales = user.nombre.slice(0, 1) + user.apellido.slice(0, 1);

            return res.status(200).jsonp({ cod: "OK", message: "Ingreso Exitoso", user: user, authorization: token });
        }

        return res.status(200).jsonp({ cod: "ERROR", message: "Email o contraseña incorrectos" });
    } catch (error) {
        return res.status(500).jsonp({ message: "Error al ingresar" });
    }

};