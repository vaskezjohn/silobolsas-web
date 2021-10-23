import { Component, Input, OnInit } from '@angular/core';
import { ForgotPasswordService } from '../services/forgot-password.service';
import { FormControl, Validators, FormControlName, FormGroup } from '@angular/forms';
import { User } from '../models/forgot-password.models';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public showError: boolean = false;
  showMsj: boolean = false;
  mail!: string;

  constructor(private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit(): void {
  }

  forgot(): boolean {
    this.showError = false;
    this.showMsj = false;
    if(this.mail) {
      let forgotMail = new User(this.mail);
      this.forgotPasswordService.forgot(forgotMail).toPromise().then(respose => { 
        this.showMsj = true;  
      }).catch(error => {
        this.showError = true;
      });
    }
    return true;
  }

}
