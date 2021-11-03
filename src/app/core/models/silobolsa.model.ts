import { Campos } from "./campos.model";

export class Silobolsa {
  constructor(
    public ID: string,
    public codigoSilo: string,
    public tipoGrano: string,
    public fechaEmbolsado: Date,
    public longitud?: string,
    public latitud?: string,
    public camposID?: number,
    public campos?: Campos,
    public detalle?: string
  ) { }

}
