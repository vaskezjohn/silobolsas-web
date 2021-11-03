import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Users} from '../../../../core/models/users.model'
import { Userervice } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  public showError: boolean = false;
  public erroMessage: string = 'No se pudo agregar el usuario';

  constructor(public dialogRef: MatDialogRef<UserNewComponent>,
    @ Inject(MAT_DIALOG_DATA) public user: Users, public userervice: Userervice) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  add() {
    this.showError = false;
    this.user.idRol = 'cf6e4f59-2de6-11ec-b9b8-883882e3ecf6'    
     this.userervice.add(this.user).toPromise().then((respose: any) => {              
      this.dialogRef.close(true);
    }).catch(responseError => {
      console.log(responseError);
      this.showError = true;
      this.erroMessage = responseError.error.message;
    });
  }

}
