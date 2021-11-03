import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Users} from '../../../../core/models/users.model'
import { Userervice } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  public showError: boolean = false;
  public erroMessage: string = 'No se pudo agregar el usuario';

  constructor(public dialogRef: MatDialogRef<UserDeleteComponent>,
    @ Inject(MAT_DIALOG_DATA) public user: Users, public userervice: Userervice) { }

  ngOnInit(): void {
  }

  onDismiss() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.showError = false; 
     this.userervice.delete(this.user).toPromise().then((respose: any) => {              
      this.dialogRef.close(true);
    }).catch(responseError => {
      console.log(responseError);
      this.showError = true;
      this.erroMessage = responseError.error.message;
    });
  }

}
