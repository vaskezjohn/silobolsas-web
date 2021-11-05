import { DateSelectionModelChange } from "@angular/material/datepicker";
import { Color } from "./color.model";
import { Dispositivo } from "./dispositivo.model";
import { Silobolsa } from "./silobolsa.model";
import { TipoNotificacion } from "./tiponotificacion.model";
import { UnidadMedida } from "./unidadmedida.model";
import { User } from "./user.model";


export class HistoricoAlarma {
  constructor(
    public ID: string,
    public valor?: number,
    public descripcion?: string,
    public fechaHora?:Date,
    public valorMinimo?: number,
    public valorMaximo?: number,

    public dispositivosID?: string,
    public dispositivos?: Dispositivo,
    public silobolsasID?: string,
    public silobolsas?: Silobolsa,
    public usuariosID?: string,
    public usuarios?: User,
    public unidadesMedidasID?: string,
    public unidadesMedidas? : UnidadMedida,
    public tiposNotificacionesID?: string,
    public tiposNotificaciones? : TipoNotificacion,
    public coloresID?: string,
    public colores?: Color
  ) { }
}
