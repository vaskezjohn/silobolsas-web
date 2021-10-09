import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user.model';
import {FormControl, Validators, FormControlName, FormGroup} from '@angular/forms';
import { LoginObject } from './models/login-object.model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public showError: boolean = false;
  usuario!: string;
  password!: string;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  login(): boolean {
    this.showError = false;
    if(this.usuario && this.password) {
      let login = new LoginObject(this.usuario, this.password);
      this.authenticationService.login(login).toPromise().then(respose => {        
        this.router.navigate(['../silobolsa']);
      }).catch(error => {
        console.log('usuario invalido');
        this.showError = true;
      });
    }
    return true;
  }

}
