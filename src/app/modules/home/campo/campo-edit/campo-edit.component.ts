import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Campo} from '../../../../core/models/campo.model'
import { CampoService } from '../../../../core/services/campo.service';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { Provincias } from '../../../../core/models/provincia.model'
import { Localidades } from '../../../../core/models/localidades.model'
import { ProvinciaService } from '../../../../core/services/provincia.service';
import { LocalidadService } from '../../../../core/services/localidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-campo-edit',
  templateUrl: './campo-edit.component.html',
  styleUrls: ['./campo-edit.component.css']
})
export class CampoEditComponent implements OnInit {
  provincias: Provincias[] =[];
  localidades: Localidades[] =[];
  public showError: boolean = false;
  public erroMessage!: string;

  constructor(public dialogRef: MatDialogRef<CampoEditComponent>,
    @ Inject(MAT_DIALOG_DATA) public campo: Campo,
    public campoService: CampoService,
    public storageService: StorageService,
    public provinciaService: ProvinciaService,
    public localidadService: LocalidadService) { }

  ngOnInit(): void {
    console.log("campo",this.campo);
    this.provinciaService.ProvinciaList().toPromise().then((response: any) => {
      response.forEach((item: any) => this.provincias.push(new Provincias(item.id, item.nombre)));
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
      this.showError = true;
      this.erroMessage = (responseError.status != 500) ? responseError.error.message : 'No se pudo editar el campo';
    });
  }

  onProvinciaChange(provinciaId: number) {
    this.localidades =[];
    this.localidadService.LocalidadList(provinciaId).toPromise().then((response: any) => {
      response.forEach((item: any) => this.localidades.push(new Localidades(item.id, item.nombre,item.CP,item.provinciasID,item.provincias)));
    }).catch(error => {
      console.log('Error al obtener las localidades');
    });
  }
}
