
export interface LoginResp {
    cod: string,
    message: string
    user: User,
    authorization: string
}

export interface User {
    id?: number,
    username: string,
    fullname: string,
    nombre: string,
    apellido: string,
    cedula: string,
    email: string,
    rol: number,
    iniciales: string
}

export const userDefault: User = {
    username: '',
    fullname: '',
    nombre: '',
    apellido: '',
    cedula: '',
    email: '',
    rol: undefined,
    iniciales: ''
}