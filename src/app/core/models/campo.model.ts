import { Localidades } from "./localidades.model";
import { Silobolsa } from "./silobolsa.model";

export class Campo {
  constructor(
    public descripcion: string,
    public calle?: string,
    public altura?: string,
    public telefono?: string,
    public mail?: string,
    public ID?: string,
    public localidadesID?: number,
    public productoresID?: string,
    public localidades?: Localidades,
    public silobolsas?: Silobolsa
  ) { }
}
