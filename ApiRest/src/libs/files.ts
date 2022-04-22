import { log } from "console";
import fs from "fs";
import path from 'path'
const DIR_PATH = "../../uploads/"

/**
 * Crear el archivo genesis para guardar la cadena de votaciones de un determinado periodo.
 * @param filename Nombre del archivo.
 * @param contenido contenido del archivo.
 */
export const crearArchivoJsonGenesis = (filename: string, contenido: string) => {
    try {
        const pathtotal = path.resolve(__dirname, DIR_PATH + filename+ '.json')
        fs.writeFile(pathtotal, contenido, function (err) {
            if (err) throw err;
            console.log('Archivo guardado!');
        });
    } catch (error) {
        log(error);
        throw new Error("Archivo no creado.");
    }
}

/**
 * Actualiza el contenido del archivo que guarda los votos.
 * @param filename Nombre del archivo.
 * @param contenido contenido del archivo.
 */
export const actualizarArchivoJson = (filename: string, contenido: string) => {
    try {
        const pathtotal = path.resolve(__dirname, DIR_PATH + filename+ '.json');
        fs.writeFile(pathtotal, contenido, function (err) {
            if (err) throw err;
            console.log('Archivo guardado!');
        });
    } catch (error) {
        log(error);
        throw new Error("Archivo no actualizado.");
    }
}

/**
 * Lee el contenido del archivo del proceso electoral.
 * @param filename Nombre del archivo
 * @returns Contenido del archivo json.
 */
export const leerArchivoPorProceso = async(filename: string) => {
    try {
        const pathtotal = path.resolve(__dirname, DIR_PATH + filename+ '.json');
        const data = await fs.readFileSync(pathtotal,'utf8');
        const lobj  = JSON.parse(data)
        return lobj
    } catch (error) {
        log(error);
        throw new Error("Archivo no existe.");
    }
}
