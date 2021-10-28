import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampoNewComponent } from '../campo-new/campo-new.component'
import { Campo } from '../models/campo.model';
import { CampoService } from '../service/campo.service';

@Component({
  selector: 'app-campo-list',
  templateUrl: './campo-list.component.html',
  styleUrls: ['./campo-list.component.css']
})
export class CampoListComponent implements OnInit {

  campos: Campo[] =[];

  displayedColumns: string[] = ['descripcion', 'calle','altura','telefono','mail', 'operations'];
  dataSource!: MatTableDataSource<Campo>;
  constructor(public dialog: MatDialog, public CampoService: CampoService) { }

  ngOnInit(): void {
    this.CampoService.CampoList().toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.campos.push(new Campo(item.descripcion, item.calle, item.altura, item.telefono, item.mail)));
      this.dataSource = new MatTableDataSource(this.campos);
    }).catch(error => {
      console.log('Error al obtener los usuario');
    });

  }

  deleteCampo(campo: string){

  }

  editCampo(campo: string){
  }

  newCampo() {
    const dialogRef = this.dialog.open(CampoNewComponent, {
      data: new Campo('', '')
    });
    dialogRef.afterClosed().subscribe(campo => {
      if (campo != undefined)
        this.addCampo(campo);
    });
  }

  addCampo(campo: Campo) {
    this.campos.push(new Campo(campo.descripcion, campo.calle, campo.altura, campo.telefono, campo.mail));
    this.dataSource.data = this.campos;
  }

  detailsCampo(campo: string) {

  }

}
