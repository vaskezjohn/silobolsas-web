import { Provincias } from "./provincia.model";

export class Localidades {
    constructor (
        public ID: number,
        public nombre: string,
        public CP: number,
        public provinciasID: number,
        public provincias: Provincias
      ) {}
    }
