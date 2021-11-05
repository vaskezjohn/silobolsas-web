import { Silobolsa } from "./silobolsa.model";

export class Dispositivo {
    constructor (
        public id: string,
        public codigoDispositivo: string, //el back devuelve codigoSilo
        public descripcion: string,
        public silobolsasID: string,
        public silobolsas?: Silobolsa
      ) {}
    }


