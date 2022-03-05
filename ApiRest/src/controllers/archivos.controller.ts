import { Request, Response } from "express";
import { UsuarioAtributos } from '../interfaces/user.iterface';
import { secuencia } from "../libs/seguridad";
import { Usuario } from "../models/Usuario.model";
import excel from 'xlsx';
const SHA256 = require('crypto-js/sha256');

/**
 * updateArchivo del sistema
 * @param req Request de la peticion del frontend
 * @param res Response que se envia al frontend
 * @returns mensaje exito
 */
export const updateArchivo = async (req: Request, res: Response) => {
    try {
        
        let file: any = req['files'];
        const { metodo } = req.query;
        const workbook = excel.readFile(file.file.tempFilePath);
        const sheet_name_list = workbook.SheetNames;
        const DATA_EXCEL:any[] = excel.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        
        let exito = true;
        let lerror: any[] = [];
        switch (metodo) {
            case 'estudiantes':
                const data: UsuarioAtributos[] = DATA_EXCEL;
                lerror = await archivoUsuario(data)
                break;
            default:
                exito = false;
                break;
        }
        if (exito) {
            if (lerror.length === 0) {
                return res.status(200).jsonp({ cod: "OK", message: "Archivo subido" });
            } else {
                return res.status(200).jsonp({ cod: "ERROR", message: "Archivo procesado con campos erroneos", lerror });
            }
        } else {
            return res.status(200).jsonp({ cod: "ERROR", message: "Metodo no reconocido para el archivo" });
        }
    } catch (error) {
        return res.status(500).jsonp({ message: "Error al ingresar" });
    }

};

const ROL_ESTUDIANTE: number = 2;
const ACTIVO: boolean = true;
const ESTUDIANTE: boolean = true;
const SUFRAGO: boolean = false;
/**
 * Metodo para ingresar o actualizar datos que se envia en el archivo.
 * @param data Data del excel que se envia desde el frontEnd
 * @returns lerrores en caso de existir.
 */
const archivoUsuario = async (data: UsuarioAtributos[]) => {
    const lusuarios = await Usuario.findAll();
    let lerror: any[] = [];
    try {
        let sec: number = await secuencia('usuario','id')
        for (let usuario of data) {
            sec = sec + 1;
            const existe = lusuarios.filter(o => { return o.cedula === usuario.cedula.toString()});
            const contrasenia = SHA256( usuario.password ).toString();
            usuario.rol = ROL_ESTUDIANTE;
            usuario.activo = ACTIVO;
            usuario.estudiante = ESTUDIANTE;
            usuario.sufrago = SUFRAGO;
            usuario.password = contrasenia;
            if (existe.length === 0) {
                usuario.id = sec;
                usuario.createdat = new Date();
                await Usuario.create(usuario,{ returning: false}).catch(err => {
                    lerror.push(usuario);
                });
            } else {
                usuario.updatedat = new Date();
                await Usuario.update(usuario, { where: { cedula: usuario.cedula } }).catch(err => {
                    lerror.push(usuario);
                });
            }
        }
        return lerror
    } catch (error) {
        throw new Error("ERROR EN LA EJECUCION DEL ARCHIVO");
    }
}