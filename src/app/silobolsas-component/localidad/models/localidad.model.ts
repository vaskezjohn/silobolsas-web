import { Provincia } from "../../provincia/models/provincia.model";

export class Localidad {
    constructor (
        public id: number,
        public nombre: string,
        public CP: number,
        public provinciasID: number,
        public provincias: Provincia
      ) {}
    }
