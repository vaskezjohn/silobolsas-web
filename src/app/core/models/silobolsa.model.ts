import { Campos } from "./campos.model";
import { Granos } from "./granos.model";
import { Dispositivo } from "./dispositivo.model";

export class Silobolsa {
  constructor(
    public ID: string,
    public codigoSilo: string,
    public granosID: string,
    public fechaEmbolsado: Date,
    public granos?: Granos,
    public longitud?: string,
    public latitud?: string,
    public camposID?: number,
    public campos?: Campos,
    public detalle?: string,
  ) { }

}
