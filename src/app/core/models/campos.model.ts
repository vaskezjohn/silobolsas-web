import { Productor } from "./productor.model";

export class Campos {
    constructor (
        public ID: string,
        public descripcion: string,
        public calle: string,
        public altura: string,
        public telefono: string,
        public mail: string,
        public localidadesID?: number,
        public productoresID?: number,
        public productores?: Productor
      ) {}
    }
