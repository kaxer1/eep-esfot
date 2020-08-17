const SHA256 = require('crypto-js/sha256');

function  calcularHash(block: any) {
    return SHA256(
        block.index +
        block.timestamp +
        block.hashAnterior +
        JSON.stringify(block.data)
    ).toString() //para transformar el resultado a string
}

class Block {
    
    public index: number;
    public hashAnterior: string;
    public timestamp: any;
    public data: any;
    public hash: string;

    constructor(index: number, timestamp: any, data: any, hashAnterior = "") {
        this.index = index;
        this.hashAnterior = hashAnterior;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = calcularHash(this);
    }

}

class Blockchain {
    
    public chain: any = [];

    constructor() {
        const genesisBlock = new Block(0, new Date().getTime(), 'Bloque Genesis', "");
        this.chain = [genesisBlock];
    }

    getUltimoBloque() {
        return this.chain[this.chain.length - 1];
    }

    crearNuevoBloque(data: any) {
        const ultimoBloque = this.getUltimoBloque();
        const nuevoBloque = new Block(
            ultimoBloque.index + 1, 
            new Date().getTime(),
            data,
            ultimoBloque.hash 
        );
        this.agregarBloque(nuevoBloque);
    }

    agregarBloque(nuevoBloque: any) {
        const ultimoBloque = this.getUltimoBloque();

        if (ultimoBloque.index + 1 !== nuevoBloque.index) {
            console.log('Indice no valido');
        } else if (nuevoBloque.hashAnterior !== ultimoBloque.hash) {
            console.log('Hash anterior no corresponde');
        } else if (nuevoBloque.hash !== calcularHash(nuevoBloque)) {
            console.log('No minaste el bloque apropiadamente');            
        } else {
            this.chain.push(nuevoBloque);
        }
    }

    imprimir() {
        this.chain.forEach((block: any) => console.log(`${JSON.stringify(block)} \n`));
        return this.chain;
    }
}

export const blockchain = new Blockchain();

export default blockchain;
// blockchain.crearNuevoBloque({de: 'kevin', a: 'ale', cantidad: 2});
// blockchain.crearNuevoBloque({de: 'ale', a: 'oscar', cantidad: 1.5});
// blockchain.crearNuevoBloque({de: 'oscar', a: 'jack', cantidad: 1});
// blockchain.imprimir();