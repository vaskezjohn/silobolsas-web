export class Silobolsa {
    constructor (
        public codigoSilo: string,
        public tipoGrano: string,
        public fechaEmbolsado: Date,
        public provinciasId?: string,
        public localidadesId?: number,
        public productoresId?: number,
        public detalle?: string
      ) {}
    }
