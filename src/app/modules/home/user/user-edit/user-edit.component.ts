import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Users} from '../../../../core/models/users.model'
import { Userervice } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public showError: boolean = false;
  public erroMessage!: string;

  constructor(public dialogRef: MatDialogRef<UserEditComponent>,
    @ Inject(MAT_DIALOG_DATA) public user: Users, public userervice: Userervice) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  edit() {
    this.showError = false;
     this.userervice.edit(this.user).toPromise().then((respose: any) => {              
      this.dialogRef.close(true);
    }).catch(responseError => {
      console.log(responseError);
      this.showError = true;      
      this.erroMessage = (responseError.status != 500) ? responseError.error.message : 'No se pudo editar el usuario';      
    });
  }
}
