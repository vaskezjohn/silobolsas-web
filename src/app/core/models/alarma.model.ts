import { Color } from "./color.model";
import { Granos } from "./granos.model";
import { TipoNotificacion } from "./tiponotificacion.model";
import { UnidadMedida } from "./unidadmedida.model";
import { User } from "./user.model";

export class Alarma {
    constructor (
        public id: string,
        public productoresID: string,
        public descripcion: string,
        public granosID: string,
        public granos: Granos,
        public unidadesMedidasID: string,
        public unidadesMedidas: UnidadMedida,
        public minimo: number,
        public maximo: number,
        public tiposNotificacionesID: string,
        public tiposNotificaciones: TipoNotificacion,
        public coloresID: string,
        public colores: Color,
        public usuarioDestinoID: string,
        public usuarioDestino: User,

      ) {}
    }
