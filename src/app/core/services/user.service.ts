import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { ResetPass } from '../models/reset-password.model';
import { ForgotPassword } from '../models/forgot-password.model';
import { Users } from '../models/users.model';

@Injectable({
    providedIn: 'root'
})
export class Userervice {
    private httpOptions: any;
    private usuarioUrl  = environment.base_url + 'Usuarios';    
    private usuarioOdataUrl  = environment.odata_base_url + 'Usuarios';
    private rolOdataUrl  = environment.odata_base_url + 'Roles';
    private authenticationUrl = environment.base_url + 'Usuarios/ForgotPassword';
    private resetPassUrl = environment.base_url + 'Usuarios/ResetPasswordToken';

    constructor(private http: HttpClient) {
        //Http Headers Options
        this.httpOptions = {
            headers : new HttpHeaders(
                {'Content-Type': 'application/json'}
            )
        }
    }

    userList() {
        return this.http.get(this.usuarioOdataUrl, this.httpOptions);
    }

    add(user: Users) {
        return this.http.post(this.usuarioUrl, user, this.httpOptions);
    }

    edit(user: Users) {
        return this.http.put(this.usuarioUrl + '/' + user.id, user, this.httpOptions);
    }

    delete(user: Users) {
        return this.http.delete(this.usuarioUrl + '/' + user.id, this.httpOptions);
    }

    forgot(forgotPasswordObj: ForgotPassword) {
        return this.http.post(this.authenticationUrl, forgotPasswordObj, this.httpOptions);
    }

    resetPass(resetPasswordObj: ResetPass) {
        return this.http.post(this.resetPassUrl, resetPasswordObj, this.httpOptions);
    }

    rolesList(){
        return this.http.get(this.rolOdataUrl, this.httpOptions);
    }
}