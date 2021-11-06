import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Productor } from 'src/app/core/models/productor.model';
import { Roles } from 'src/app/core/models/roles.model';
import { ProductorService } from 'src/app/core/services/productor.service';
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
    this.getRoles();
    this. getProductores();
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

  getProductores(){
    this.productorService.ProductorList().toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.productores.push(
        new Productor(item.ID,
          item.razonSocial,
          item.cuit,
          item.telefono,
          item.mail,
          item.fechaAlta)
      ));
    }).catch(error => {
      console.log('Error al obtener los productores');
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
    this.user.productoresID = this.productores.filter((x) => x.id == this.form.controls['productores'].value)[0].id;
    this.user.rolesID = this.roles.filter((x) => x.ID == this.form.controls['roles'].value)[0].ID;
    this.user.password = this.form.controls['passwordnew'].value;
  }


  add() {
    if (!this.form.valid) {
      return;
    }
    this.setUsuario();
    this.userervice.add(this.user).toPromise().then((respose: any) => {
      this.dialogRef.close(true);
    }).catch(responseError => {
      console.log(responseError);
    });
  }

}
