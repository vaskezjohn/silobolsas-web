import { Campos } from "./campos.models";

export class Silobolsa {
    constructor (
        public codigoSilo: string,
        public tipoGrano: string,
        public fechaEmbolsado: Date,
        public longitud?: string,
        public latitud?: string,
        public camposId?: number,        
        public campos?: Campos,
        public detalle?: string
      ) {}
    }
