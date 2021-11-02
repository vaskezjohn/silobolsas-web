import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampoNewComponent } from '../campo-new/campo-new.component'
import { CampoViewComponent } from '../campo-view/campo-view.component'
import { CampoEditComponent } from '../campo-edit/campo-edit.component';
import { CampoDeleteComponent } from '../campo-delete/campo-delete.component';
import { Campo } from '../models/campo.model';
import { CampoService } from '../service/campo.service';
import { StorageService } from 'src/app/authentication/services/storage.service';

@Component({
  selector: 'app-campo-list',
  templateUrl: './campo-list.component.html',
  styleUrls: ['./campo-list.component.css']
})

export class CampoListComponent implements OnInit {
  campos: Campo[] =[];



  displayedColumns: string[] = ['descripcion', 'localidad', 'calle','altura','telefono','mail', 'operations'];
  dataSource!: MatTableDataSource<Campo>;
  constructor(public dialog: MatDialog, public CampoService: CampoService, public storageService: StorageService) { }

  ngOnInit(): void {
    this.CampoService.CampoList(this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.campos.push(new Campo(item.descripcion, item.calle, item.altura, item.telefono, item.mail,item.id, item.localidadesID, item.productoresID)));
      this.dataSource = new MatTableDataSource(this.campos);
    }).catch(error => {
      console.log('Error al obtener los campos');
    });

  }

  deleteCampo(campo: Campo){
    const dialogRef = this.dialog.open(CampoDeleteComponent, {
      data: this.clone(campo)
    });
    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse){
        this.campos =[]
        this.ngOnInit();
      }
    });
  }

  editCampo(campo: Campo){
    const dialogRef = this.dialog.open(CampoEditComponent, {
      data: this.clone(campo)
    });
    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse){
        this.campos =[]
        this.ngOnInit();
      }
    });
  }

  newCampo() {
    const dialogRef = this.dialog.open(CampoNewComponent, {
      data: new Campo('', '', '', '', '', '',0,'')
    });
    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse){
        this.campos =[]
        this.ngOnInit();
      }
    });
  }

  addCampo(campo: Campo) {
    this.campos.push(new Campo(campo.descripcion, campo.calle, campo.altura, campo.telefono, campo.mail,campo.id,campo.localidadesID,campo.productoresID));
    this.dataSource.data = this.campos;
  }

  detailsCampo(campo: Campo) {
    console.log(campo.descripcion)
    const dialogRef = this.dialog.open(CampoViewComponent, {
      data: campo
    });
  }

  clone(campo: Campo): Campo {
    var cloned = new Campo(campo.descripcion, campo.calle, campo.altura, campo.telefono, campo.mail, campo.id, campo.localidadesID, campo.productoresID);
    return cloned;
  }
}
