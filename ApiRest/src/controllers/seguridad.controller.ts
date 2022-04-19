import { Request, Response } from "express";
import { MenuAtributos, TransaccionesAtributos, RolAtributos } from "interfaces/user.iterface";
import { pool } from '../database'
import { Menu } from "../models/Menu.model";
import { secuencia } from '../libs/seguridad';
import { Transacciones } from "../models/Transacciones.model";
import { Rol } from "../models/Rol.model";


export const obtenerMenu = async (req: Request, res: Response) => {
    try {
        const subquery = '(select s.nombre from rol s where s.id = t.id_rol) as nrol';
        const q = `SELECT t.*, ${subquery} FROM menu t order by t.id_rol`
        
        const menu = await pool.query(q).then(result => { return result.rows });

        return res.status(200).jsonp({ cod: "OK", message: "", menu });
    } catch (error) {
        return res.status(500).jsonp({ message: "Falla de la BDD" });
    }
};

export const obtenerTransaccion = async (req: Request, res: Response) => {
    try {
        const q = `SELECT t.* FROM transacciones t order by t.ruta`

        const transacciones = await pool.query(q).then(result => { return result.rows });

        return res.status(200).jsonp({ cod: "OK", message: "", transacciones });
    } catch (error) {
        return res.status(500).jsonp({ message: "Falla de la BDD" });
    }
};

export const obtenerRol = async (req: Request, res: Response) => {
    try {
        const q = `SELECT t.* FROM rol t order by t.id`
        
        const rol = await pool.query(q).then(result => { return result.rows });

        return res.status(200).jsonp({ cod: "OK", message: "", rol });
    } catch (error) {
        return res.status(500).jsonp({ message: "Falla de la BDD" });
    }
};

export const mantenimientoMenu = async (req: Request, res: Response) => {
    try {
        const {update} = req.query;
        let menu: MenuAtributos = req.body.data;
        switch (update) {
            case '0': // Graba
                const sec: number = await secuencia('menu','id')
                menu.id = sec + 1;
                await Menu.create(menu,{ returning: false});
                break;
            case '1': // Actualiza
                await Menu.update(menu, { where: { id: menu.id } });
                break;
            default:
                throw new Error("ERROR EN LA TRANSACCION");
        }        

        return res.status(200).jsonp({ cod: "OK", message: "Transaccion exitosa" });
    } catch (error) {
        return res.status(500).jsonp({ message: "Falla de la BDD" });
    }
};

export const mantenimientoTransaccion = async (req: Request, res: Response) => {
    try {
        const {update} = req.query;
        let transacciones: TransaccionesAtributos = req.body.data;
        switch (update) {
            case '0': // Graba
                await Transacciones.create(transacciones,{ returning: false});
                break;
            case '1': // Actualiza
                await Transacciones.update(transacciones, { where: { ruta: transacciones.ruta } });
                break;
            default:
                throw new Error("ERROR EN LA TRANSACCION");
        }        

        return res.status(200).jsonp({ cod: "OK", message: "Transaccion exitosa" });
    } catch (error) {
        return res.status(500).jsonp({ message: "Falla de la BDD" });
    }
};

export const mantenimientoRol = async (req: Request, res: Response) => {
    try {
        const {update} = req.query;
        let rol: RolAtributos = req.body.data;
        switch (update) {
            case '0': // Graba
                const sec: number = await secuencia('rol','id')
                rol.id = sec + 1;
                await Rol.create(rol,{ returning: false});
                break;
            case '1': // Actualiza
                await Rol.update(rol, { where: { id: rol.id } });
                break;
            default:
                throw new Error("ERROR EN LA TRANSACCION");
        }        

        return res.status(200).jsonp({ cod: "OK", message: "Transaccion exitosa" });
    } catch (error) {
        return res.status(500).jsonp({ message: "Falla de la BDD" });
    }
};