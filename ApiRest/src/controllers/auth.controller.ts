import { Request, Response } from "express";
import pool from "../database";
import jwt from "jsonwebtoken";
import { User } from '../interfaces/user.iterface';

// registrar usuarios
export const signup = (req: Request, res: Response) => {
    console.log(req.body);

    res.send('signup');
};
// login
export const signin = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    console.log(email, password);

    try {
        if (email === undefined || email === null || email === '') return res.status(400).jsonp({ message: "Usuario indefinido" });
        if (password === undefined || password === null || password === '') return res.status(400).jsonp({ message: "Password indefinido" });

        const user = await pool.query('SELECT id, username, nombre, apellido, email, rol FROM usuario WHERE email = $1 AND password = $2 AND estado = true', [email, password])
            .then(result => {
                return result.rows[0]
            }) as User;
        console.log(user);

        if (user) {
            let token;
            if (user.rol === 1) {
                token = jwt.sign({ _id: user.id, rol: user.rol }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: 60 * 60 * 24 });
            } else if (user.rol === 2) {
                // token = jwt.sign({ _id: user.id, rol: user.rol }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: 60 * 5 });
                token = jwt.sign({ _id: user.id, rol: user.rol }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: 60 * 60 * 24 });
            }

            return res.jsonp({ User: user, Authorization: token });
        }
        // console.log('Email o contraseña incorrecots');

        return res.status(400).jsonp({ message: "Email o contraseña incorrectos" });
    } catch (error) {
        console.log(error);
        return res.status(400).jsonp({ message: "Error al ingresar" });
    }

};
// perfil
export const profile = (req: Request, res: Response) => {
    console.log(req.userId);
    console.log(req.userRol);

    res.send('profile');
};
