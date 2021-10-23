import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
<<<<<<< HEAD
import { AuthenticationService } from '../authentication/services/authentication.service';
import { Session } from '../authentication/models/session.model';
import {FormControl, Validators, FormControlName, FormGroup} from '@angular/forms';
import { LoginObject } from '../authentication/models/login-object.model';
import { User } from '../authentication/models/user.model';
import { Role } from '../authentication/models/role';
import { StorageService } from '../authentication/services/storage.service';
=======
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user.model';
import { FormControl, Validators, FormControlName, FormGroup } from '@angular/forms';
import { LoginObject } from './models/login-object.model';
>>>>>>> 796a23d867225f59d05f554ab39d7b1772f70c59

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public showError: boolean = false;
  usuario!: string;
  password!: string;

  constructor(private router: Router, private authenticationService: AuthenticationService, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  login(): boolean {
    this.showError = false;
    if (this.usuario && this.password) {
      let login = new LoginObject(this.usuario, this.password);
      this.authenticationService.login(login).toPromise().then((respose: any) => {        
        let sesion = new Session(respose.data.token, respose.data.tokenExpires, new User(respose.data.id, respose.data.email, respose.data.nombre, respose.data.apellido, respose.data.telefono, Role[respose.data.roles.rol == Role.ADMIN? Role.ADMIN:Role.AGRO]));
        this.correctLogin(sesion)
      }).catch(error => {
        console.log('usuario invalido');
        this.showError = true;
      });
    }
    return true;
  }

  private correctLogin(session: Session){
    this.storageService.setCurrentSession(session);
    this.router.navigate([session.user.role==Role.AGRO ? '../dashboard':'../user-list']);
  }

}
