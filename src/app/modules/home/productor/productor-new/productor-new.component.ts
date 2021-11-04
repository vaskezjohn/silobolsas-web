import { formatDate } from '@angular/common';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from 'src/app/authentication/services/storage.service';
import { Productor} from '../models/productor.model';
import { Provincia} from '../../provincia/models/provincia.model'
import { Localidad} from '../../localidad/models/localidad.model'
import { ProductorService } from '../service/productor.service';
import { ProvinciaService } from '../../provincia/service/provincia.service';
import { LocalidadService } from '../../localidad/service/localidad.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-productor-new',
  templateUrl: './productor-new.component.html',
  styleUrls: ['./productor-new.component.css']
})
export class ProductorNewComponent implements OnInit {
  form!: FormGroup;
  provincias: Provincia[] =[];
  localidades: Localidad[] =[];
  editMode = false;
  resultadoProvincias!: Array<any>;
  resultadoLocalidades!: Array<any>;
  public showError: boolean = false;
  public erroMessage: string = 'No se pudo agregar el productor';

  constructor(
    public dialogRef: MatDialogRef<ProductorNewComponent>,
    private formBuilder: FormBuilder,
    public productorService: ProductorService,
    public storageService: StorageService,
    public provinciaService: ProvinciaService,
    public localidadService: LocalidadService,
    @Inject(MAT_DIALOG_DATA) public productor: Productor) { }

  ngOnInit(): void {

    this.provinciaService.ProvinciaList().toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.provincias.push(new Provincia(item.id, item.nombre)));
      this.resultadoProvincias = this.provincias;

    }).catch(error => {
      console.log('Error al obtener provincias');
    });

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

    //this.getCampos();

    if (this.productor.id) {
      this.setEditForm();
      this.editMode = true;
    }
    else
      this.editMode = false;
  }

  onProvinciaChange(provinciaId: number) {
    this.localidadService.LocalidadList(provinciaId).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.localidades.push(new Provincia(item.id, item.nombre)));
      this.resultadoLocalidades = this.localidades;

    }).catch(error => {
      console.log('Error al obtener localidades');
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  setEditForm() {
    /* console.log('set', this.silobolsa);
    this.form.controls['tipoGrano'].setValue(this.silobolsa.tipoGrano);
    this.form.controls['fechaEmbolsado'].setValue(new Date(this.silobolsa.fechaEmbolsado).toISOString().split('T')[0]);
    this.form.controls['campos'].setValue(this.silobolsa.camposID);
    this.form.controls['longitud'].setValue(this.silobolsa.longitud);
    this.form.controls['latitud'].setValue(this.silobolsa.latitud);
    this.form.controls['detalle'].setValue(this.silobolsa.detalle); */
  }


  //TODO ver ngmodel
  setProductor() {
    /* this.silobolsa.tipoGrano = this.form.controls['tipoGrano'].value;
    this.silobolsa.fechaEmbolsado = this.form.controls['fechaEmbolsado'].value;
    this.silobolsa.camposID = this.form.controls['campos'].value;
    this.silobolsa.longitud = this.form.controls['longitud'].value;
    this.silobolsa.latitud = this.form.controls['latitud'].value;
    this.silobolsa.detalle = this.form.controls['detalle'].value;
    this.silobolsa.campos = this.campos.filter((x) => x.ID == this.form.controls['campos'].value)[0];*/
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

}
