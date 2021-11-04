export class Productor {
    constructor (
        public id?: string,
        public razonSocial?: string,
        public cuit?: string,
        public telefono?: string,
        public mail?: string,
        public fechaAlta?: string,
        public bajaLogica?: boolean,
        public localidadesID?: number,
        public localidad?: object,
        public calle?: string,
        public altura?: string,
      ) {}
    }
