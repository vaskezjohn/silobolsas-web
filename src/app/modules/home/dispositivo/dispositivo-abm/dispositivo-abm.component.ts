import { formatDate } from '@angular/common';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import Swal from 'sweetalert2';
import { Campo } from 'src/app/core/models/campo.model';
import { Silobolsa } from 'src/app/core/models/silobolsa.model';
import { Dispositivo } from 'src/app/core/models/dispositivo.model';
import { CampoService } from '../../../../core/services/campo.service';
import { SilobolsaService } from '../../../../core/services/silobolsa.service';
import { DispositivoService } from '../../../../core/services/dispositivo.service';

@Component({
  selector: 'app-dispositivo-abm',
  templateUrl: 'dispositivo-abm.component.html',
  styleUrls: ['dispositivo-abm.component.css']
})
export class DispositivoAbmComponent implements OnInit {
  form!: FormGroup;
  campos: Campo[] =[];
  silobolsas: Silobolsa[] =[];
  //campoID!: "";
  editMode = false;
  resultadoCampos!: Array<any>;
  resultadoSilobolsas!: Array<any>;
  public showError: boolean = false;
  public erroMessage: string = 'No se pudo agregar el dispossitivo';

  constructor(
    public dialogRef: MatDialogRef<DispositivoAbmComponent>,
    private formBuilder: FormBuilder,
    public campoService: CampoService,
    public silobolsaService: SilobolsaService,
    public dispositivoService: DispositivoService,
    public storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public dispositivo: Dispositivo) { }

  ngOnInit(): void {
    this.getCampos();
    this.getSilobolsas();

    this.form = this.formBuilder.group({
      descripcion: ['', Validators.required],
      campos: ['' ],
      silobolsas: ['', Validators.required]
    });

    if (this.dispositivo.id) {
      this.setEditForm();
      this.editMode = true;
    }
    else
      this.editMode = false;
  }

  getCampos() {
      this.campoService.CampoList(this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.campos.push(new Campo(item.descripcion,'','','','',item.ID,undefined,undefined,undefined)));
      this.resultadoCampos = this.campos;

    }).catch(error => {
      console.log('Error al obtener campos');
    });
  }

  getSilobolsas() {
    this.silobolsaService.SilobolsasList(this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.silobolsas.push(new Silobolsa(item.ID, item.codigoSilo, item.tipoGrano, item.fechaEmbolsado, item.longitud, item.latitud, item.camposID, item.campos, item.detalle)));
      this.resultadoSilobolsas = this.silobolsas;
      console.log(this.silobolsas )
    }).catch(error => {
      console.log('Error al obtener silobolsas');
    });
  }

  onCampoChange(campoID: string) {
    console.log('onCampoChange', campoID);
    this.silobolsas = [];
    this.resultadoSilobolsas=[];
    this.dispositivo.silobolsasID!= undefined;
    this.silobolsaService.SilobolsasListByCampo(campoID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.silobolsas.push(new Silobolsa(item.id, item.codigoSilo, item.tipoGrano, item.fechaEmbolsado, item.longitud, item.latitud, item.camposID, item.campos, item.detalle)));
      this.resultadoSilobolsas = this.silobolsas;
      console.log(this.silobolsas )
    }).catch(error => {
      console.log('Error al obtener silobolsas');
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  setEditForm() {
    /* var provinciaId = this.productor.localidad?.provinciasID == undefined? 1: this.productor.localidad?.provinciasID;
    this.form.controls['razonSocial'].setValue(this.productor.razonSocial);
    this.form.controls['cuit'].setValue(this.productor.cuit);
    this.form.controls['telefono'].setValue(this.productor.telefono);
    this.form.controls['mail'].setValue(this.productor.mail);
    this.form.controls['fechaAlta'].setValue(new Date(this.productor.fechaAlta).toISOString().split('T')[0]);
    this.form.controls['provincias'].setValue(this.productor.localidad?.provinciasID);
    this.onProvinciaChange(provinciaId);
    this.form.controls['localidades'].setValue(this.productor.localidadesID);
    this.form.controls['calle'].setValue(this.productor.calle);
    this.form.controls['altura'].setValue(this.productor.altura); */
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    //this.productor.fechaAlta = this.form.controls['fechaAlta'].value;

    if(this.editMode)
    {
      //this.update();
    }
    else
    {
      this.add();
    }
    //this.dialogRef.close(this.productor);
  }

  add() {
    this.showError = false;
    console.log(this.dispositivo)
    this.dispositivoService.add(this.dispositivo).toPromise().then((respose: any) => {
    this.dialogRef.close(true);
    Swal.fire('Dispositivo dado de alta!', '', 'success');
    }).catch(responseError => {
      console.log(responseError);
      this.showError = true;
      this.erroMessage = responseError.error.message;
      Swal.fire('Ocurrió un error imprevisto', '', 'error');
    });
  }

  /* update()
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
  }*/

}
