export class User {
    constructor (        
        public nombre: string,
        public apellido: string,
        public telefono: string,
        public genero: number,
        public email: string,
        public usuario?: string,
        public password?: string,
        public id?: string,
        public idRol?: string
      ) {}
    }