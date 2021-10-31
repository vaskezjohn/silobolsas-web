export class Campos {
    constructor (
        public ID: string,
        public descripcion: string,
        public calle: Date,
        public altura?: string,
        public telefono?: string,
        public mail?: string,
        public localidadesID?: number,
        public productoresID?: number
      ) {}
    }
