import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Campo} from '../models/campo.model'
import { CampoService } from '../service/campo.service';
import { StorageService } from 'src/app/authentication/services/storage.service';
import { Provincia} from '../../provincia/models/provincia.model'
import { Localidad} from '../../localidad/models/localidad.model'
import { ProvinciaService } from '../../provincia/service/provincia.service';
import { LocalidadService } from '../../localidad/service/localidad.service';

@Component({
  selector: 'app-campo-edit',
  templateUrl: './campo-edit.component.html',
  styleUrls: ['./campo-edit.component.css']
})
export class CampoEditComponent implements OnInit {
  provincias: Provincia[] =[];
  localidades: Localidad[] =[];
  resultadoProvincias!: Array<any>;
  resultadoLocalidades!: Array<any>;
  public showError: boolean = false;
  public erroMessage!: string;

  constructor(public dialogRef: MatDialogRef<CampoEditComponent>,
    @ Inject(MAT_DIALOG_DATA) public campo: Campo,
    public campoService: CampoService,
    public storageService: StorageService,
    public provinciaService: ProvinciaService,
    public localidadService: LocalidadService) { }

  ngOnInit(): void {
    this.provinciaService.ProvinciaList().toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.provincias.push(new Provincia(item.id, item.nombre)));
      this.resultadoProvincias = this.provincias;

    }).catch(error => {
      console.log('Error al obtener provincias');
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  edit() {
    this.showError = false;
    this.campo.productorId = this.storageService.getCurrentUser().productoresID;
     this.campoService.edit(this.campo).toPromise().then((respose: any) => {
      this.dialogRef.close(true);
    }).catch(responseError => {
      console.log(responseError);
      this.showError = true;
      this.erroMessage = (responseError.status != 500) ? responseError.error.message : 'No se pudo editar el campo';
    });
  }

  onProvinciaChange(provinciaId: number) {
    this.localidadService.LocalidadList(provinciaId).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.localidades.push(new Provincia(item.id, item.nombre)));
      this.resultadoLocalidades = this.localidades;

    }).catch(error => {
      console.log('Error al obtener localidades');
    });
  }
}
