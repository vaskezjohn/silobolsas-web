export class ResetPass {
    constructor(
        public usuario: string,
        public token: string,
        public newPassword: string
    ) {}
}