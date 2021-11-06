import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Campo} from '../../../../core/models/campo.model'
import { CampoService } from '../../../../core/services/campo.service';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { Provincia} from '../../../../core/models/provincia.model'
import { Localidad} from '../../../../core/models/localidades.model'
import { ProvinciaService } from '../../../../core/services/provincia.service';
import { LocalidadService } from '../../../../core/services/localidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-campo-edit',
  templateUrl: './campo-edit.component.html',
  styleUrls: ['./campo-edit.component.css']
})
export class CampoEditComponent implements OnInit {
  provincias: Provincia[] =[];
  localidades: Localidad[] =[];
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
    }).catch(error => {
      console.log('Error al obtener las provincias');
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  edit() {
    this.showError = false;
     this.campoService.edit(this.campo).toPromise().then((respose: any) => {
      this.dialogRef.close(true);      
      Swal.fire('Campo actualizado!', '', 'success');
    }).catch(responseError => {
      console.log(responseError);
      this.showError = true;
      this.erroMessage = (responseError.status != 500) ? responseError.error.message : 'No se pudo editar el campo';
    });
  }

  onProvinciaChange(provinciaId: number) {
    this.localidades =[];
    this.localidadService.LocalidadList(provinciaId).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.localidades.push(new Localidad(item.id, item.nombre,item.CP,item.provinciasID,item.provincias)));
    }).catch(error => {
      console.log('Error al obtener las localidades');
    });
  }
}
