import { Menu } from 'interfaces/user.iterface';
import { pool } from '../database';
import nodemailer from 'nodemailer';
import { msgEmail } from 'interfaces/proceso.interface';
import { log } from 'console';

/**
 * Encuenta menu por rol
 * @param rol Id del rol
 * @returns retorna un arreglo con el menu.
 */
export const sacarmenu = async (rol: number) => {
    const q = `SELECT * FROM menu WHERE id_rol = ${rol} order by id_padre`;
    try {
        const menu = await pool.query(q).then(result => { return result.rows });
        let menunode: any = [];
        if (menu.length > 0) {
            const menupadres = menu.filter((o: Menu) => { return o.cruta == null && o.id_padre == null });
            menupadres.forEach((o: Menu) => {
                o.hijos = menu.filter((m: Menu) => { return o.id == m.id_padre })
                menunode.push(o)
            })
        }
        return menunode;
    } catch (error) {
        return []
    }
}

/**
 * Metodo para obtener la secuencia del siguente numero identificador.
 * @param tname nombre de la tabla de la base de datos
 * @param pk Identificador que se use para la secuencia number
 * @returns identificador de secuencia.
 */
export const secuencia = async (tname: string, pk: string) => {

    try {
        const q = `SELECT MAX( ${pk} ) as ${tname} FROM ${tname} `
        const secuencia: any[] = await pool.query(q).then(result => { return result.rows });
        if (secuencia.length === 0) {
            return 0;
        }
        return secuencia[0][tname];
    } catch (error) {
        throw new Error("ERROR EN LA EJECUCION DE SECUENCIA");
    }
}

const USER: string = 'eep.esfot2022@gmail.com'
const smtpTransport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'd7fdb97d48542a',
        pass: '5c7beb9ceb6761',
    }
});

smtpTransport.verify().then(() => {
    log("Listo para enviar email");
})

/**
 * Metodo para enviar emails desde el origen de una cuenta para la esfot.
 * @param data Estructura del email a ser enviado
 * @returns Valor booleando si envio o no el mensaje.
 */
export const enviarMail = async function (data: msgEmail) {
    data.from = USER;
    return await smtpTransport.sendMail(data);
}

/**
 * Obtiene dato segun el nombre del parametro.
 * @param nombre Nombre del parametro
 * @returns valor del parametro
 */
export const getParametros = async function (nombre: string) {
    try {
        const query = `select texto from parametros where nombre = $1`;
        const [ item ] = await pool.query(query, [nombre]).then( (result) => { return result.rows});
        return (item == undefined) ? "" : item.texto;
    } catch (error) {
        log(error);
        return ''
    }
}