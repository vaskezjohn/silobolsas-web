import { formatDate } from '@angular/common';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { Granos } from 'src/app/core/models/granos.model';
import { GranosService } from 'src/app/core/services/granos.service';
import { Campos } from '../../../../core/models/campos.model';
import { Silobolsa } from '../../../../core/models/silobolsa.model';
import { SilobolsaService } from '../../../../core/services/silobolsa.service';



@Component({
  selector: 'app-silobolsa-abm',
  templateUrl: './silobolsa-abm.component.html',
  styleUrls: ['./silobolsa-abm.component.css']
})
export class SilobolsaAbmComponent implements OnInit {
  form!: FormGroup;
  campos: Campos[] = [];
  granos: Granos[] = [];
  editMode = false;

  constructor(
    public dialogRef: MatDialogRef<SilobolsaAbmComponent>,
    private formBuilder: FormBuilder,
    public silobolsaService: SilobolsaService,
    public storageService: StorageService,
    public granosService: GranosService,
    @Inject(MAT_DIALOG_DATA) public silobolsa: Silobolsa) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      granos: ['', Validators.required],
      fechaEmbolsado: ['', Validators.required],
      campos: ['', Validators.required],
      longitud: ['', Validators.required],
      latitud: ['', Validators.required],
      detalle: ['', Validators.required],
    });

    this.getCampos();
    this.getGranos();

    if (this.silobolsa.ID) {
      this.setEditForm();
      this.editMode = true;
    }
    else
      this.editMode = false;
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  setEditForm() {
    console.log('set', this.silobolsa);
    this.form.controls['granos'].setValue(this.silobolsa.granosID);
    this.form.controls['fechaEmbolsado'].setValue(new Date(this.silobolsa.fechaEmbolsado).toISOString().split('T')[0]);
    this.form.controls['campos'].setValue(this.silobolsa.camposID);
    this.form.controls['longitud'].setValue(this.silobolsa.longitud);
    this.form.controls['latitud'].setValue(this.silobolsa.latitud);
    this.form.controls['detalle'].setValue(this.silobolsa.detalle);
  }

  getCampos() {
    this.silobolsaService.CamposList(
      this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
        respose.forEach((item: any) => this.campos.push(
          new Campos(item.id,
            item.descripcion,
            item.calle,
            item.altura,
            item.telefono,
            item.mail)
        ));
      }).catch(error => {
        console.log('Error al obtener las campos');
      });
  }

  getGranos() {
    this.granosService.GranosList().toPromise().then((respose: any) => {
        respose.forEach((item: any) => this.granos.push(
          new Granos(item.id,
            item.descripcion)
        ));
      }).catch(error => {
        console.log('Error al obtener las campos');
      });
  }

  setCampos() {
    this.silobolsa.granos = this.granos.filter((x) => x.ID == this.form.controls['granos'].value)[0];
    this.silobolsa.fechaEmbolsado = this.form.controls['fechaEmbolsado'].value;
    this.silobolsa.camposID = this.form.controls['campos'].value;    
    this.silobolsa.granosID = this.form.controls['granos'].value;
    this.silobolsa.longitud = this.form.controls['longitud'].value;
    this.silobolsa.latitud = this.form.controls['latitud'].value;
    this.silobolsa.detalle = this.form.controls['detalle'].value;
    this.silobolsa.campos = this.campos.filter((x) => x.ID == this.form.controls['campos'].value)[0];
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.setCampos();
    this.dialogRef.close(this.silobolsa);
  }

}
