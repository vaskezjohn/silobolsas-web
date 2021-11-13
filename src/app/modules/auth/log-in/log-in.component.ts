import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from '../../../core/authentication/services/authentication.service';
import { Session } from '../../../core/models/session.model';
import {FormControl, Validators, FormControlName, FormGroup} from '@angular/forms';
import { LoginObject } from '../../../core/models/login-object.model';
import { User } from '../../../core/models/user.model';
import { Role } from '../../../core/models/role.model';
import { StorageService } from '../../../core/authentication/services/storage.service';




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
        console.log('responseUser',respose);  
        let sesion = new Session(respose.data.token, respose.data.tokenExpires, new User(respose.data.id, respose.data.email, respose.data.nombre, respose.data.apellido, respose.data.telefono,respose.data.rolesID,respose.data.productoresID, respose.data.roles.rol));
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
