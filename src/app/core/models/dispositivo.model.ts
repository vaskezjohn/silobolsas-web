import { Silobolsa } from "./silobolsa.model";

export class Dispositivo {
    constructor (
        public id: string,
        public codigo: string, //el back devuelve codigoSilo
        public descripcion: string,
        public silobolsasID: string,
        public silobolsas?: Silobolsa
      ) {}
    }


