import { Menu } from 'interfaces/user.iterface';
import {pool} from '../database';

export const sacarmenu = async (rol: number) => {
    const q = `SELECT * FROM menu WHERE id_rol = ${rol} `
    try {
        const menu = await pool.query(q).then(result => { return result.rows });
        let menunode: any = [];
        if (menu.length > 0) {
            const menupadres = menu.filter((o: Menu) => { return o.cruta == null && o.id_padre == null});
            menupadres.forEach((o: Menu) => {
                o.hijos = menu.filter((m: Menu) => { return o.id == m.id_padre})
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
export const secuencia = async(tname: string, pk: string) => {

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