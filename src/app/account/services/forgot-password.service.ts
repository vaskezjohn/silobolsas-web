import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/forgot-password.models';
import { environment } from '../../../environments/environment';
import { ResetPass } from '../models/reset-password.models';

@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordService {
    private httpOptions: any;
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

    forgot(forgotPasswordObj: User) {
        return this.http.post(this.authenticationUrl, forgotPasswordObj, this.httpOptions);
    }

    resetPass(resetPasswordObj: ResetPass) {
        return this.http.post(this.resetPassUrl, resetPasswordObj, this.httpOptions);
    }
}