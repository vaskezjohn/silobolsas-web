import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { Productor } from 'src/app/core/models/productor.model';
import { Roles } from 'src/app/core/models/roles.model';
import { ProductorService } from 'src/app/core/services/productor.service';
import Swal from 'sweetalert2';
import { Users } from '../../../../core/models/users.model'
import { Userervice } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
  form!: FormGroup;  
  productores: Productor[] = [];
  roles: Roles[] = [];

  constructor(
    public dialogRef: MatDialogRef<UserNewComponent>,
    private formBuilder: FormBuilder,
    public productorService: ProductorService,
    public userervice: Userervice,
    private storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public user: Users) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      productores: ['', Validators.required],
      roles: ['',Validators.required],
      passwordnew: ['',Validators.required]
    });
    if(this.storageService.isAdmin()) {
      this.getRoles();
      this.getProductores();
    } else {
      this.form.controls['productores'].setValue(this.storageService.getCurrentUser().productoresID);
      //rol AGRO
      this.form.controls['roles'].setValue('cf6e4f59-2de6-11ec-b9b8-883882e3ecf6');
    }
    
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

  cancelar() {
    this.dialogRef.close(false);
  }

  setUsuario() {
    this.user.nombre = this.form.controls['nombre'].value;
    this.user.apellido = this.form.controls['apellido'].value;
    this.user.telefono = this.form.controls['telefono'].value;
    this.user.email = this.form.controls['email'].value;    
    this.user.usuario = this.form.controls['email'].value;    
    this.user.productoresID = this.storageService.isAdmin() ? this.productores.filter((x) => x.ID == this.form.controls['productores'].value)[0].ID : this.storageService.getCurrentUser().productoresID;
    this.user.rolesID = this.storageService.isAdmin() ? this.roles.filter((x) => x.ID == this.form.controls['roles'].value)[0].ID : 'cf6e4f59-2de6-11ec-b9b8-883882e3ecf6';
    this.user.password = this.form.controls['passwordnew'].value;
  }


  add() {
    if (!this.form.valid) {
      return;
    }
    this.setUsuario();
    this.userervice.add(this.user).toPromise().then((respose: any) => {
      this.dialogRef.close(true);      
      Swal.fire('Usuario dado de alta!', '', 'success');
    }).catch(responseError => {
      console.log(responseError);
    });
  }

  getProductores() {
    this.productorService.ProductorList().subscribe((response: Array<Productor>) => {
      this.productores = response;
    });
  }

  isAdmin(): boolean {
    return this.storageService.isAdmin();
  }

}
