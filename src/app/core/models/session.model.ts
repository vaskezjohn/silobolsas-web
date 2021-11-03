import { User } from './user.model';

export class Session {
    constructor(    
        public token: string,
        public tokenExpires: string,
        public user: User
        ) {}
  }