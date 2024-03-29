import { Request, Response, NextFunction } from 'express';
import { Menu } from 'interfaces/user.iterface';
import jwt from 'jsonwebtoken';
import {pool} from '../database'
import { Proceso } from '../interfaces/proceso.interface';
import { User } from '../interfaces/user.iterface';

interface IPayload {
    _id: number,
    rol: number,
    menu: Menu[],
    iat: number,
    exp: number,
    proceso: Proceso[],
    user: User
}

interface current {
    current_date: Date,
    current_time: string
}

export const TokenValidation = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const auth: any = req.header('authorization')
        const token = auth.split(' ')[1];
    
        if (!token) return res.status(401).jsonp({ message: 'Acceso denegado' });

        const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload; // extraer informacion del token.

        if (!payload) return res.status(401).jsonp({ message: 'Token invalido' });

        // const acceso: boolean = await validarFechaEntrada(payload);
        // if (acceso === false) return res.status(401).jsonp({ message: 'Tiempo de Votacion expirado.' });

        req.userId = payload._id;
        req.userRol = payload.rol;
        req.menu = payload.menu;
        if (payload.proceso !== undefined) {
            req.proceso = payload.proceso;
        }

        next()
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') return res.status(401).jsonp({ message: "El tiempo de votación para tu usuario a expirado." });
        if (error.name === 'JsonWebTokenError') return res.status(401).jsonp({ message: "Token no valido." });
        return res.status(500).jsonp({ message: "Error en Base de datos." });
    }
}

async function validarFechaEntrada(payload: IPayload) {

    if (payload.rol === 1) return true;

    const iat = new Date(payload.iat * 1000);

    const [dateBDD] = await pool.query('select current_date , current_time;').then(result => { return result.rows }) as current[] // dia y hora de la base de datos.
    const timeBDD = new Date(dateBDD.current_date.toJSON().split('T')[0] + "T" + dateBDD.current_time.split('.')[0]) // Fecha BDD

    const [proceso] = payload.proceso;

    const inicioF = new Date(proceso.fec_eleccion.split('T')[0] + "T" + proceso.hora_inicio); // Fecha con hora inicio proceso electoral
    const finalF = new Date(proceso.fec_eleccion.split('T')[0] + "T" + proceso.hora_final); // Fecha con hora final proceso electoral

    // verificacion por fecha y hora del proceso y BDD el acceso solo para rol estudiante.
    if (iat.valueOf() >= inicioF.valueOf() && iat.valueOf() <= finalF.valueOf() && timeBDD.valueOf() >= inicioF.valueOf() && finalF.valueOf() <= finalF.valueOf()) {
        return true
    }

    return false
}