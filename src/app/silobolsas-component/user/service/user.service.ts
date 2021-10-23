import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Userervice {
    private httpOptions: any;
    private basePath  = 'https://gendesoft.com/silobolsas-api/odata/Usuarios';

    constructor(private http: HttpClient) {
        //Http Headers Options
        this.httpOptions = {
            headers : new HttpHeaders(
                {'Content-Type': 'application/json'}
            )
        }
    }

    userList() {
        return this.http.get(this.basePath, this.httpOptions);
    }
}