import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

// metodo para colocar las imagenes diskStorage()
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
})

export default multer({ storage });


export const ImagenBase64LogosEmpresas = async function (path_file: string) {
    try {
        path_file = path.resolve('uploads') + '/' + path_file;
        console.log(path_file);
        let data = fs.readFileSync(path_file);
        return 'data:image/jpeg;base64,' + data.toString('base64');
    } catch (error) {
        return 0
    }
}