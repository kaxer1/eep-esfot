import Pool from 'pg-pool';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'eep',
    password: 'admin'
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log("Error durante la conexión", err);
    } else {
        console.log("Conexión exitosa BDD");
    }
});

import { Sequelize } from 'sequelize'
import { database } from './config';

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, 
    { 
        host: database.host,
        dialect: "postgres",
        port: 5432
    },
);

export {sequelize, pool};