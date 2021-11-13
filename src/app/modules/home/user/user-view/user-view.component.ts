import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { Productor } from 'src/app/core/models/productor.model';
import { Roles } from 'src/app/core/models/roles.model';
import { ProductorService } from 'src/app/core/services/productor.service';
import { Users} from '../../../../core/models/users.model'
import { Userervice } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  public productores?: Array<Productor>;
  public roles: Roles[] = [];
  
  constructor(public dialogRef: MatDialogRef<UserViewComponent>,
    @ Inject(MAT_DIALOG_DATA) public user: Users, public userervice: Userervice, public productorService: ProductorService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    if(this.isAdmin()) {
      this.getProductores();
      this.getRoles();
    }
  }

  close() {
    this.dialogRef.close();
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
