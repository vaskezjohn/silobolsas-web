import { Localidad } from "./localidad.model";

export class Productor{
    ID!: string;
    razonSocial!: string;
    cuit!: string;
    telefono!: string;
    mail!: string;
    fechaAlta!: Date;
    localidadesID!: string;
    localidades!: Localidad;
    calle!: string;
    altura!: string;
    constructor(){}
}