const database = {
    username: process.env.USERNAME_DB || 'postgres',
    password: process.env.PASSWORD_DB || "mysecretpassword",
    database: process.env.DATABASE || "eep",
    host: process.env.HOST_DB || "20.124.138.186",
    port: 5432
}
export { database }