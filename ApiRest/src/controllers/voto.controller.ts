import { Request, Response } from "express";
import blockchain from "../libs/blockchain";

// voto blockchain
export const registrarVoto = (req: Request, res: Response) => {
    console.log(req.body);
    blockchain.crearNuevoBloque(req.body);
    res.jsonp({message:"Voto Registrado"});
};

export const verVotos = (req: Request, res: Response) => {

    res.jsonp(blockchain.imprimir());
}