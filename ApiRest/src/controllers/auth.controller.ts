import { Request, Response } from "express";
import { pool } from "../database";
import jwt from "jsonwebtoken";
import { User } from '../interfaces/user.iterface';
import { Proceso, msgEmail } from '../interfaces/proceso.interface';
import { enviarMail, sacarmenu } from "../libs/seguridad";
import { Usuario } from "../models/Usuario.model";

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
        if (password === undefined || password === null || password === '') return res.status(200).jsonp({ cod: "ERROR", message: "Password indefinido" });

        // busca usuario activo.
        let user = await pool.query('SELECT (nombre || \' \' || apellido) as fullname, * FROM usuario WHERE email = $1 AND password = $2 AND activo = true', [email, password])
            .then(result => {
                return result.rows[0]
            }) as User;

        if (user) {
            user.password = '';
            let menu = await sacarmenu(user.rol);
            let sessiontime = 60 * 60 * 24; // tiempo 1 dia

            let token;
            if (user.estudiante === true) {
                if (user.sufrago === true) return res.status(200).jsonp({ cod: "ERROR", message: "Usuario ya sufrago." });
                let proceso = await pool.query('SELECT * FROM proceso_electoral WHERE estado = true ORDER BY fec_eleccion DESC LIMIT 1')
                    .then(result => { return result.rows }) as Proceso[];
                // sessiontime = 60 * 5
                token = jwt.sign({ _id: user.id, rol: user.rol, proceso, menu }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: sessiontime }); 
            } else {
                token = jwt.sign({ _id: user.id, rol: user.rol, menu }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: sessiontime });
            }

            user.iniciales = (user.nombre !== "") ? user.nombre.slice(0, 1) : '';
            user.iniciales = (user.apellido !== "") ? user.iniciales + user.apellido.slice(0, 1) : '';

            return res.status(200).jsonp({ cod: "OK", message: "Ingreso Exitoso", user: user, menu, authorization: token, sessiontime });
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

/**
 * Metodo que construye la data del correo electronico.  
 * @param req Request de la peticion del frontend
 * @param res Response que se envia al frontend
 * @returns mensaje estado
 */
export const EnviarEmailCambioPassword = async (req: Request, res: Response) => {
    try {

        const { email } = req.body;

        const usuario = await Usuario.findOne({ where: { email: email } });

        if (usuario === null) {
            return res.status(200).jsonp({ cod: "ERROR", message: "El email de usuario no existe." });
        }

        let token = jwt.sign({ _id: usuario.id, rol: usuario.rol }, process.env.TOKEN_SECRET || 'tokentest', { expiresIn: 60 * 10 });
        const url = `http://localhost:4400/recuperar?token=${token}`
        let message: msgEmail = {
            from: '',
            to: usuario.email,
            subject: 'Recuperación de contraseña de usuario',
            html: `<p>Hola recupera tu contraseña en el siguiente link: ${url}</p>`,
        }

        const enviado = await enviarMail(message).then((o) => {
            console.log(o)
            return true
        }).catch((e) => { 
            console.error(e)
            return false
        });
        
        if (enviado) {
            return res.status(200).jsonp({ cod: "OK", message: "Email enviado, revisa tu correo electrónico." });
        }

        return res.status(200).jsonp({ cod: "ERROR", message: "El email de recuperación de contraseña no se ha enviado." });
    } catch (error) {
        return res.status(500).jsonp({ message: "Error en el proceso" });
    }
}

/**
 * Metodo para actualizar la contraseña en el flujo de recuperacion de contraseña
 * @param req Request de la peticion del frontend
 * @param res Response que se envia al frontend
 * @returns mensaje estado
 */
export const actualizarPassword = async (req: Request, res: Response) => {
    try {

        const id_user = req.userId
        const {newpassword} = req.body;
        let usuario = await Usuario.findOne({ where: { id: id_user } });
        
        if (usuario == null) {
            return res.status(200).jsonp({ cod: "ERROR", message: "Usuario no encontrado" });
        }
        usuario.password = newpassword;
        usuario.save()

        return res.status(200).jsonp({ cod: "OK", message: "" });
    } catch (error) {
        return res.status(500).jsonp({ message: "Error en el proceso" });
    }
}

// Error: connect ETIMEDOUT 74.125.26.108:465 at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1161:16) at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17)