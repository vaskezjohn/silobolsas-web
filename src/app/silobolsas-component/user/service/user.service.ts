import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class Userervice {
    private httpOptions: any;
    private basePath  = 'https://gendesoft.com/silobolsas-api/';

    constructor(private http: HttpClient) {
        //Http Headers Options
        this.httpOptions = {
            headers : new HttpHeaders(
                {'Content-Type': 'application/json'}
            )
        }
    }

    userList() {
        return this.http.get(this.basePath + 'odata/Usuarios', this.httpOptions);
    }

    add(user: User) {
        return this.http.post(this.basePath + 'Usuarios', user, this.httpOptions);
    }

    edit(user: User) {
        return this.http.put(this.basePath + 'Usuarios/' + user.id, user, this.httpOptions);
    }

    delete(user: User) {
        return this.http.delete(this.basePath + 'Usuarios/' + user.id, this.httpOptions);
    }
}