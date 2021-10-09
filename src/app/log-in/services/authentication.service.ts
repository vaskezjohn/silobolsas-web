import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginObject } from '../models/login-object.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private httpOptions: any;
    private authenticationUrl = 'https://gendesoft.com/silobolsas-api/Usuarios/Login';

    constructor(private http: HttpClient) {
        //Http Headers Options
        this.httpOptions = {
            headers : new HttpHeaders(
                {'Content-Type': 'application/json'}
            )
        }
    }

    login(loginObj: LoginObject) {
        console.log(`Login User ${loginObj.usuario}`);
        return this.http.post(this.authenticationUrl, loginObj, this.httpOptions);
    }
}