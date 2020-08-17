import { Request, Response } from "express";
import pool from "../database";
import path from 'path';
import fs from 'fs';

export const createImageCandidato = async(req: Request, res: Response) => {

    console.log(req.body);
    console.log(req.file.path);
    // console.log(req.file);

    const {nom_lista, descripcion} = req.body;
    const logo = req.file.filename; 
    
    await pool.query('INSERT INTO lista_electoral(nom_lista, descripcion, logo) VALUES($1, $2, $3)', [nom_lista, descripcion, logo]);

    return res.json({message: 'Foto guardada'});
}

export const getImageCandidatos = async(req: Request, res: Response) => {
    const filename = req.params.logo;
    res.sendFile(path.resolve('uploads') + '//' + filename)
}

export const getAudio = async (req: Request, res: Response) => {

    res.sendFile(path.resolve('uploads') + "//track1.mp3")
}