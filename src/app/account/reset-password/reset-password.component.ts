import { Component, Input, OnInit } from '@angular/core';
import { ForgotPasswordService } from '../services/forgot-password.service';
import { FormControl, Validators, FormControlName, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPass } from '../models/reset-password.models';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public showError: boolean = false;
  pass!: string;
  confPass!: string;
  usuario!: string;
  token!: string;
  mensaje!: string;
  urlTree;



  constructor(private router: Router, private resetPasswordService: ForgotPasswordService) {
    this.urlTree = this.router.parseUrl(this.router.url);
    this.token = this.urlTree.queryParams['token'];
    this.usuario = this.urlTree.queryParams['user'];
  }

  ngOnInit(): void {
  }

  resetPassword(): boolean {
    this.showError = false;
    if ((this.pass && (this.pass == this.confPass)) && this.usuario && this.token) {
      let resetPasswordObj = new ResetPass(this.usuario, this.token, this.pass);
      this.resetPasswordService.resetPass(resetPasswordObj).toPromise().then(respose => {
        this.router.navigate(['../login']);
      }).catch(error => {
        this.showError = true;
        this.mensaje = error.message;
      });
    }
    return true;
  }

}
