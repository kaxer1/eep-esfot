export interface MenuNode {
    name: string;
    icono?: string;
    children?: itemNode[];
}

export interface itemNode {
    name: string;
    url: string;
}