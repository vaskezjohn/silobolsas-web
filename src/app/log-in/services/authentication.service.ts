import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginObject} from "../models/login-object.model";
import {Session} from "../models/session.model";

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private basePath = 'https://gendesoft.com/silobolsas-api/';

  login(loginObj: LoginObject): Observable<Session> {
    return this.http.post<Session>(this.basePath + 'Usuarios/Login', loginObj);
  }

  logout(): Observable<Boolean> {
    return this.http.post<Boolean>(this.basePath + 'logout', {});
  }
}
