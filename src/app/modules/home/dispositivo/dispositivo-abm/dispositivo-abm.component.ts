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
  campos: Campo[] = [];
  silobolsas: Silobolsa[] = [];
  //campoID!: "";
  editMode = false;
  resultadoCampos!: Array<any>;
  resultadoSilobolsas!: Array<any>;
  //dispositivosPorSilobolsa!: Array<any>;
  //dispositivosPorSilobolsa!: Array<any>;
  cantidadDispositivosPorSilovolsa!: 0;
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
      campos: [''],
      silobolsas: ['', Validators.required]
    });

    if (this.dispositivo.ID) {
      this.setEditForm();
      this.editMode = true;
    }
    else
      this.editMode = false;
  }

  getCampos() {
    this.campoService.CampoList(this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.campos.push(new Campo(item.descripcion, '', '', '', '', item.ID, undefined, undefined, undefined)));
      this.resultadoCampos = this.campos;

    }).catch(error => {
      console.log('Error al obtener campos');
    });
  }

  getSilobolsas() {
    this.silobolsaService.SilobolsasList(this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.silobolsas.push(new Silobolsa(item.ID, item.codigoSilo, item.tipoGrano, item.fechaEmbolsado, item.longitud, item.latitud, item.camposID, item.campos, item.detalle)));
      this.resultadoSilobolsas = this.silobolsas;

    }).catch(error => {
      console.log('Error al obtener silobolsas');
    });
  }

  cantidadDispositivosBySilobolsa(silobolsaID: string) {
    this.cantidadDispositivosPorSilovolsa = 0;

    this.dispositivoService.DispositivoListBySilobolasID(this.dispositivo.silobolsasID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.cantidadDispositivosPorSilovolsa++);
    }).catch(error => {
      console.log('Error cantidadDispositivosBySilobolsa');
    });
  }

  onCampoChange(campoID: string) {
    this.silobolsas = [];
    this.resultadoSilobolsas = [];
    this.dispositivo.silobolsasID != undefined;
    this.silobolsaService.SilobolsasListByCampo(campoID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.silobolsas.push(new Silobolsa(item.id, item.codigoSilo, item.tipoGrano, item.fechaEmbolsado, item.longitud, item.latitud, item.camposID, item.campos, item.detalle)));
      this.resultadoSilobolsas = this.silobolsas;
    }).catch(error => {
      console.log('Error al obtener silobolsas');
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  setEditForm() {
    this.form.controls['descripcion'].setValue(this.dispositivo.descripcion);
    this.form.controls['campos'].setValue(this.dispositivo.silobolsas?.camposID);
    this.form.controls['silobolsas'].setValue(this.dispositivo.silobolsasID);
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    if (this.cantidadDispositivosPorSilovolsa >= 8) {
      Swal.fire('La silobolsa seleccionada ya posee 8 dispositivos asociados', '', 'error');
      return;
    }

    if (this.editMode) {
      this.update();
    }
    else {
      this.add();
    }
    this.dialogRef.close(this.dispositivo);
  }

  add() {
    this.showError = false;
    this.dispositivoService.add(this.dispositivo).toPromise().then((respose: any) => {
      this.dialogRef.close(true);
      Swal.fire('Dispositivo dado de alta!', '', 'success');
    }).catch(responseError => {
      this.showError = true;
      this.erroMessage = responseError.error.message;
      Swal.fire('Ocurrió un error imprevisto', '', 'error');
    });
  }

  update() {
    this.showError = false;
    this.dispositivoService.edit(this.dispositivo.ID, this.dispositivo).toPromise().then((respose: any) => {
      this.dialogRef.close(true);
      Swal.fire('Dispositivo actualizado!', '', 'success');
    }).catch(responseError => {
      this.showError = true;
      this.erroMessage = responseError.error.message;
      Swal.fire('Ocurrió un error imprevisto', '', 'error');
    });
  }

}
