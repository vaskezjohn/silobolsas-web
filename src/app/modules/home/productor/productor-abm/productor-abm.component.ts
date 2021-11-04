import { formatDate } from '@angular/common';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { Productor} from '../../../../core/models/productor.model';
import { Provincia} from '../../../../core/models/provincia.model'
import { Localidad} from '../../../../core/models/localidades.model'
import { ProductorService } from '../../../../core/services/productor.service';
import { ProvinciaService } from '../../../../core/services/provincia.service';
import { LocalidadService } from '../../../../core/services/localidad.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-productor-abm',
  templateUrl: './productor-abm.component.html',
  styleUrls: ['./productor-abm.component.css']
})
export class ProductorAbmComponent implements OnInit {
  form!: FormGroup;
  provincias: Provincia[] =[];
  localidades: Localidad[] =[];
  editMode = false;
  resultadoProvincias!: Array<any>;
  resultadoLocalidades!: Array<any>;
  public showError: boolean = false;
  public erroMessage: string = 'No se pudo agregar el productor';

  constructor(
    public dialogRef: MatDialogRef<ProductorAbmComponent>,
    private formBuilder: FormBuilder,
    public productorService: ProductorService,
    public storageService: StorageService,
    public provinciaService: ProvinciaService,
    public localidadService: LocalidadService,
    @Inject(MAT_DIALOG_DATA) public productor: Productor) { }

  ngOnInit(): void {
    this.getProvincias();

    this.form = this.formBuilder.group({
      razonSocial: ['', Validators.required],
      cuit: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]], //Patron solo numeros y 11
      telefono: ['', Validators.required],
      mail: ['', Validators.required],
      fechaAlta: ['', Validators.required],
      provincias: ['', Validators.required],
      localidades: ['', Validators.required],
      calle: ['', Validators.required],
      altura: ['', Validators.required],
    });

    if (this.productor.id) {
      this.setEditForm();
      this.editMode = true;
    }
    else
      this.editMode = false;
  }

  getProvincias() {
    this.provinciaService.ProvinciaList().toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.provincias.push(new Provincia(item.id, item.nombre)));
      this.resultadoProvincias = this.provincias;

    }).catch(error => {
      console.log('Error al obtener provincias');
    });
  }

  onProvinciaChange(provinciaId: number) {
    this.localidades = [];
    this.localidadService.LocalidadList(provinciaId).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.localidades.push(new Localidad(item.id, item.nombre,item.CP,item.provinciasID,item.provincias)));
      this.resultadoLocalidades = this.localidades;

    }).catch(error => {
      console.log('Error al obtener localidades');
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  setEditForm() {
    var provinciaId = this.productor.localidad?.provinciasID == undefined? 1: this.productor.localidad?.provinciasID;
    this.form.controls['razonSocial'].setValue(this.productor.razonSocial);
    this.form.controls['cuit'].setValue(this.productor.cuit);
    this.form.controls['telefono'].setValue(this.productor.telefono);
    this.form.controls['mail'].setValue(this.productor.mail);
    this.form.controls['fechaAlta'].setValue(new Date(this.productor.fechaAlta).toISOString().split('T')[0]);
    this.form.controls['provincias'].setValue(this.productor.localidad?.provinciasID);
    this.onProvinciaChange(provinciaId);
    this.form.controls['localidades'].setValue(this.productor.localidadesID);
    this.form.controls['calle'].setValue(this.productor.calle);
    this.form.controls['altura'].setValue(this.productor.altura);
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.productor.fechaAlta = this.form.controls['fechaAlta'].value;

    if(this.editMode)
    {
      this.update();
    }
    else
    {
      this.add();
    }
    //this.dialogRef.close(this.productor);
  }

  add() {
    this.showError = false;
    console.log(this.productor)
    this.productorService.add(this.productor).toPromise().then((respose: any) => {
    this.dialogRef.close(true);
    Swal.fire('Productor dado de alta!', '', 'success');
    }).catch(responseError => {
      console.log(responseError);
      this.showError = true;
      this.erroMessage = responseError.error.message;
      Swal.fire('Ocurrió un error imprevisto', '', 'error');
    });
  }

  update()
  {
    this.showError = false;
    console.log(this.productor)
    this.productorService.edit(this.productor.id, this.productor).toPromise().then((respose: any) => {
    this.dialogRef.close(true);
    Swal.fire('Productor actualizado!', '', 'success');
    }).catch(responseError => {
      console.log(responseError);
      this.showError = true;
      this.erroMessage = responseError.error.message;
      Swal.fire('Ocurrió un error imprevisto', '', 'error');
    });
  }

}
