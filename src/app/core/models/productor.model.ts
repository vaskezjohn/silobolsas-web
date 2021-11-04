import { Localidad } from "./localidades.model";

export class Productor {
    constructor (
        public id: string,
        public razonSocial: string,
        public cuit: string,
        public telefono: string,
        public mail: string,
        public fechaAlta: Date,
        public bajaLogica?: boolean,
        public localidadesID?: number,
        public localidad?: Localidad,
        public calle?: string,
        public altura?: string,
      ) {}
    }
