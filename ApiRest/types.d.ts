declare namespace Express {
    export interface Request {
        userId: number,
        userRol: number,
        menu: Menu[]
        proceso: Proceso[]
        files:any
    }
}