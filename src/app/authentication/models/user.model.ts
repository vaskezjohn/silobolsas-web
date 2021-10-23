import { Role } from "./role";

export class User {
    constructor(
        public id: string,
        public email: string,
        public firstname: string,
        public lastname: string,
        public phone: string,
        public role: Role
    ) {}
}