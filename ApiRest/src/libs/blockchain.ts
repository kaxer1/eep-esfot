import { actualizarArchivoJson, crearArchivoJsonGenesis, leerArchivoPorProceso } from "./files";

const SHA256 = require('crypto-js/sha256');

function  calcularHash(block: any) {
    return SHA256(
        block.index +
        block.timestamp +
        block.hashAnterior +
        JSON.stringify(block.data) +
        block.nonce
    ).toString()
}

class Block {
    
    public index: number;
    public hashAnterior: string;
    public timestamp: any;
    public data: any;
    public hash: string;
    public nonce: number;

    constructor(index: number, timestamp: any, data: any, hashAnterior = "") {
        this.index = index;
        this.hashAnterior = hashAnterior;
        this.timestamp = timestamp;
        this.data = data;
        this.nonce = 0;
        this.hash = calcularHash(this);
    }

    minarBloque(dificultad: number) {
        while (this.hash.substring(0, dificultad) !== Array(dificultad + 1).join('0')) {
            this.nonce++;
            this.hash = calcularHash(this)
        }
    }
}

export class Blockchain {
    
    public chain: any = [];
    public dificultad = 2;

    constructor() { }

    crearArchivoGenesis(filename: string) {
        const genesisBlock = new Block(0, new Date().getTime(), 'Bloque Genesis', "");
        genesisBlock.minarBloque(this.dificultad);
        crearArchivoJsonGenesis(filename, JSON.stringify([genesisBlock]));
    }

    async getDataArchivo(filename: string) {
        const datablockchain = await leerArchivoPorProceso(filename);
        this.chain = datablockchain;
    }

    getUltimoBloque() {
        return this.chain[this.chain.length - 1];
    }

    crearNuevoBloque(filename: string, data: any) {
        const ultimoBloque = this.getUltimoBloque();
        const nuevoBloque = new Block(
            ultimoBloque.index + 1, 
            new Date().getTime(),
            data,
            ultimoBloque.hash 
        );
        nuevoBloque.minarBloque(this.dificultad); 
        this.agregarBloque(nuevoBloque, filename);
    }

    agregarBloque(nuevoBloque: any, filename: string) {
        const ultimoBloque = this.getUltimoBloque();

        if (ultimoBloque.index + 1 !== nuevoBloque.index) {
            console.log('Indice no valido');
        } else if (nuevoBloque.hashAnterior !== ultimoBloque.hash) {
            console.log('Hash anterior no corresponde');
        } else if (nuevoBloque.hash !== calcularHash(nuevoBloque)) {
            console.log('No minaste el bloque apropiadamente');            
        } else {
            this.chain.push(nuevoBloque);
            actualizarArchivoJson(filename, JSON.stringify(this.chain))
        }
    }

    imprimir() {
        return this.chain;
    }
}
