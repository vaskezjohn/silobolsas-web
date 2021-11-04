import { DateSelectionModelChange } from "@angular/material/datepicker";
import { Silobolsa } from "./silobolsa.model";
import { UnidadMedida } from "./unidadmedida.model";


export class Medicion {
  constructor(
    public ID: string,
    public valor?: number,
    public fechaHora?:Date,
    public dispositivosID?: string,
    public silobolsasID?: string,
    public silobolsas?: Silobolsa,
    public unidadesMedidasID?: string,
    public unidadesMedidas? : UnidadMedida
  ) { }
}
