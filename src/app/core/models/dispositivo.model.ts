import { Silobolsa } from "./silobolsa.model";

export class Dispositivo {
    constructor (
        public ID: string,
        public codigoSilo: string, //el back devuelve codigoSilo
        public descripcion: string,
        public silobolsasID: string,
        public silobolsas?: Silobolsa
      ) {}
    }


