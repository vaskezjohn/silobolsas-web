import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginObject } from '../../models/login-object.model';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private httpOptions: any;
    private authenticationUrl = environment.base_url + 'Usuarios/Login';

    constructor(private http: HttpClient) {
        //Http Headers Options
        this.httpOptions = {
            headers : new HttpHeaders(
                {'Content-Type': 'application/json'}
            )
        }
    }

    login(loginObj: LoginObject) {
        return this.http.post(this.authenticationUrl, loginObj, this.httpOptions);
    }
}