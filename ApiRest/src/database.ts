import { Sequelize } from 'sequelize'
import { database } from './config';
import Pool from 'pg-pool';

const pool = new Pool({
    user: database.username,
    host: database.host,
    port: database.port,
    database: database.database,
    password: database.password
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log("Error durante la conexión", err);
    } else {
        console.log("Conexión exitosa BDD");
    }
});


const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, 
    { 
        host: database.host,
        dialect: "postgres",
        port: database.port
    },
);

export {sequelize, pool};