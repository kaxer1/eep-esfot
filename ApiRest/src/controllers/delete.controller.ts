import { Request, Response } from 'express';
import {pool} from "../database";
import { QueryResult } from 'pg';

export const deleteMetodoGeneral = async (req: Request, res: Response): Promise<Response> => {
    try {
        let { nametable, idreg, pkatributo } = req.query;
        let query = '';
        if (pkatributo !== 'id') {
            idreg = "'" + idreg + "'" ;
            query = `DELETE FROM ${nametable} WHERE ${pkatributo} = ${idreg} RETURNING *`
        } else {
            query = `DELETE FROM ${nametable} WHERE ${pkatributo} = ${idreg} RETURNING *`
        }
        const response: QueryResult = await pool.query(query);
        return res.status(200).jsonp({ cod: "OK", message: "Registro eliminado con exito", delete: response.rows})
    } catch (error) {
        console.log(error);
        return res.status(500).jsonp({ message: 'Fallo en la BDD' });
    }
};