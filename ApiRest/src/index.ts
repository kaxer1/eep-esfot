import dotenv from 'dotenv';
dotenv.config()

import app from "./app";

import {sequelize} from './database';

function main() {
    app.listen(app.get('port'), () => {
        sequelize.authenticate().then(() => {
            console.log("Nos hemos conectado a la base de datos");
        }).catch(error => {
            console.log('Se ha producido un error', error);
        })
    });
    console.log('Server on port', app.get('port'));
}

main();