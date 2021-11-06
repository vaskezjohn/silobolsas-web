import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Productor } from 'src/app/core/models/productor.model';
import { ProductorService } from 'src/app/core/services/productor.service';
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
  public productores?: Array<Productor>;

  constructor(public dialogRef: MatDialogRef<UserEditComponent>,
    @ Inject(MAT_DIALOG_DATA) public user: Users, public userervice: Userervice, public productorService: ProductorService) { }

  ngOnInit(): void {
    this.getProductores();
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  edit() {
    this.showError = false;
     this.userervice.edit(this.user).toPromise().then((respose: any) => {              
      this.dialogRef.close(true);      
      Swal.fire('Usuario actualizado!', '', 'success');
    }).catch(responseError => {
      console.log(responseError);
      this.showError = true;      
      this.erroMessage = (responseError.status != 500) ? responseError.error.message : 'No se pudo editar el usuario';      
    });
  }

  getProductores() {
    this.productorService.ProductorList().subscribe((response: Array<Productor>) => {
      this.productores = response;
    });
  }

}
