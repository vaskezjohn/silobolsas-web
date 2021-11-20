import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampoNewComponent } from '../campo-new/campo-new.component'
import { CampoViewComponent } from '../campo-view/campo-view.component'
import { CampoEditComponent } from '../campo-edit/campo-edit.component';
import { CampoDeleteComponent } from '../campo-delete/campo-delete.component';
import { Campo } from '../../../../core/models/campo.model';
import { CampoService } from '../../../../core/services/campo.service';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-campo-list',
  templateUrl: './campo-list.component.html',
  styleUrls: ['./campo-list.component.css']
})

export class CampoListComponent implements OnInit {
  campos: Campo[] = [];

  displayedColumns: string[] = ['descripcion', 'provincia', 'localidad', 'calle', 'altura', 'telefono', 'mail', 'operations'];
  dataSource!: MatTableDataSource<Campo>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, public CampoService: CampoService, public storageService: StorageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.CampoService.CampoList(this.storageService.getCurrentUser().productoresID).toPromise().then((response: any) => {
      this.dataSource = new MatTableDataSource<Campo>(response);
      this.dataSource.paginator = this.paginator;
    }).catch(error => {
      console.log('Error al obtener los campos');
    });
  }

  deleteCampo(campo: Campo) {
    Swal.fire({
      title: 'Eliminar campo',
      text: '¿Desea eliminar campo ' + campo.descripcion + '?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.CampoService.delete(campo).toPromise().then((respose: any) => {
          this.dataSource.data = this.dataSource.data.filter(
            (x) => x.ID != campo.ID
          );
        }).catch(error => {
          Swal.fire('Error!', 'campo invalido!', 'error');
        });
        Swal.fire('Eliminado!', '', 'success');
      }
    })
  }

  editCampo(campo: Campo) {
    const dialogRef = this.dialog.open(CampoEditComponent, {
      data: this.clone(campo)
    });
    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse) {
        this.campos = []
        this.ngOnInit();
      }
    });
  }

  newCampo() {
    const dialogRef = this.dialog.open(CampoNewComponent, {
      data: new Campo('', '', '', '', '', '', 0, '')
    });
    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse) {
        this.loadData();
      }
    });
  }

  addCampo(campo: Campo) {
    this.campos.push(new Campo(campo.descripcion, campo.calle, campo.altura, campo.telefono, campo.mail, campo.ID, campo.localidadesID, campo.productoresID, campo.localidades, campo.silobolsas));
    this.loadData();
  }

  detailsCampo(campo: Campo) {
    const dialogRef = this.dialog.open(CampoViewComponent, {
      data: campo
    });
  }

  clone(campo: Campo): Campo {
    var cloned = new Campo(campo.descripcion, campo.calle, campo.altura, campo.telefono, campo.mail, campo.ID, campo.localidadesID, campo.productoresID, campo.localidades, campo.silobolsas);
    return cloned;
  }
}
