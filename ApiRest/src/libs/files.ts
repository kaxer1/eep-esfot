import fs from "fs";

export const crearArchivoJsonGenesis = (filename: string, contenido: string) => {
    fs.writeFile(filename + '.json', contenido, function (err) {
        if (err) throw err;
        console.log('Archivo guardado!');
    });
}

export const actualizarArchivoJson = (filename: string, contenido: string) => {
    fs.writeFile(filename + '.json', contenido, function (err) {
        if (err) throw err;
        console.log('Archivo guardado!');
    });
}

export const leerArchivoPorProceso = async(filename: string) => {
    try {
        const data = await fs.readFileSync(filename + '.json','utf8');
        const lobj  = JSON.parse(data)
        return lobj
    } catch (error) {
        throw new Error("Archivo no existe.");
    }
}
