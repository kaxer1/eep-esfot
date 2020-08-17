import { Request, Response } from "express";
import pool from "../database";
import jwt from "jsonwebtoken";

// registrar usuarios
export const signup = (req: Request, res: Response) => {
    console.log(req.body);
    
    res.send('signup');
};
// login
export const signin = async (req: Request, res: Response) => {

    console.log(req.body);
    const {email, password} = req.body;

    try {
        if ( email === undefined || email === null || email === '') return res.status(400).jsonp({message:"Usuario indefinido"});
        if ( password === undefined || password === null || password === '') return res.status(400).jsonp({message:"Password indefinido"});

        const user = await pool.query('SELECT id, username, nombre, apellido, cedula, email, rol FROM usuario WHERE email = $1 AND password = $2 AND estado = true', [email, password]);
        if (user.rowCount > 0) {
            const token = jwt.sign({_id: user.rows[0].id, rol: user.rows[0].rol}, process.env.TOKEN_SECRET || 'tokentest', {expiresIn: 60 * 3 });
            return res.header('auth-token', token).jsonp(user.rows);
        } 
        
        return res.status(400).jsonp({message:"Email o contraseña incorrectos"});
    } catch (error) {
        console.log(error);
        return res.status(400).jsonp({message:"Error al ingresar"});
    }

};
// perfil
export const profile = (req: Request, res: Response) => {
    console.log(req.userId);
    console.log(req.userRol);
    
    res.send('profile');
};