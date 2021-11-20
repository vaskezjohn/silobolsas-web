import { Localidades } from "./localidades.model";

export class Productor {
    constructor (
        public ID: string,
        public razonSocial: string,
        public cuit: string,
        public telefono: string,
        public mail: string,
        public fechaAlta: Date,
        public bajaLogica?: boolean,
        public localidadesID?: number,
        public localidades?: Localidades,
        public calle?: string,
        public altura?: string,
      ) {}
    }
