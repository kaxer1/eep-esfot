import Pool from 'pg-pool';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'eep',
    password: 'fulltime'
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log("Error durante la conexión", err);
    } else {
        console.log("Conexión exitosa BDD");
    }
});

export default pool;