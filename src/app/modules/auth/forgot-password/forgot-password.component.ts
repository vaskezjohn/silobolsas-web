import { Component, Input, OnInit } from '@angular/core';
import { ForgotPassword } from '../../../core/models/forgot-password.model';
import { Userervice } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public showError: boolean = false;
  showMsj: boolean = false;
  mail!: string;

  constructor(private userervice: Userervice) { }

  ngOnInit(): void {
  }

  forgot(): boolean {
    this.showError = false;
    this.showMsj = false;
    if(this.mail) {
      let forgotMail = new ForgotPassword(this.mail);
      this.userervice.forgot(forgotMail).toPromise().then(respose => { 
        this.showMsj = true;  
      }).catch(error => {
        this.showError = true;
      });
    }
    return true;
  }

}
