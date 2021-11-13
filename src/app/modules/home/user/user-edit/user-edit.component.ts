import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Productor } from 'src/app/core/models/productor.model';
import { ProductorService } from 'src/app/core/services/productor.service';
import { Users} from '../../../../core/models/users.model'
import { Userervice } from '../../../../core/services/user.service';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { Roles } from 'src/app/core/models/roles.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public showError: boolean = false;
  public erroMessage!: string;
  public productores?: Array<Productor>;
  roles: Roles[] = [];

  constructor(public dialogRef: MatDialogRef<UserEditComponent>,
    @ Inject(MAT_DIALOG_DATA) public user: Users, public userervice: Userervice, public productorService: ProductorService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    if(this.isAdmin()) {
      this.getProductores();
      this.getRoles();
    }
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

  getRoles(){
    this.userervice.rolesList().toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.roles.push(
        new Roles(item.id,
          item.rol,
          item.descripcion)
      ));
    }).catch(error => {
      console.log('Error al obtener los usuarios');
    });
  }

  isAdmin(): boolean {
    return this.storageService.isAdmin();
  }

}
