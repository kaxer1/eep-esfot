export interface User {
    id: number,
    username: string,
    fullname: string,
    nombre: string,
    apellido: string,
    cedula: string,
    email: string,
    rol: number,
    iniciales: string,
    sufrago: boolean,
    activo: boolean | null,
    estudiante: boolean | null,
    password: string,
    vota?: boolean
    tiemposesion?: number
}

export interface UsuarioAtributos {
    id: number
    username: string
    nombre: string
    apellido: string
    cedula: string
    password: string
    email: string
    rol: number
    activo: boolean
    sufrago: boolean
    estudiante: boolean
    createdat: Date
    updatedat: Date | null
}

export interface Menu {
    id: number,
    id_rol: number,
    cruta: string | null,
    id_padre: number | null,
    nombre: string,
    icon: string,
    crear: boolean,
    editar: boolean,
    eliminar: boolean,
    mostrarmenu: boolean,
    hijos?: Menu[]
}

export interface MenuAtributos {
    id: number
    id_rol: number,
    cruta: string,
    id_padre: number,
    nombre: string,
    icon: string,
    crear: boolean,
    editar: boolean,
    eliminar: boolean,
    mostrarmenu: boolean,
}

export interface TransaccionesAtributos {
    ruta: string,
    path: string,
}

export interface RolAtributos {
    id: number,
    nombre: string,
    vota: boolean,
};