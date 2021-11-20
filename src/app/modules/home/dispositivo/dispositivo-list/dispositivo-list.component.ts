import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DispositivoAbmComponent } from '../dispositivo-abm/dispositivo-abm.component'
import { DispositivoViewComponent } from '../dispositivo-view/dispositivo-view.component';
import { Dispositivo } from '../../../../core/models/dispositivo.model';
import { DispositivoService } from '../../../../core/services/dispositivo.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { MatPaginator } from '@angular/material/paginator';




@Component({
  selector: 'app-dispositivo-list',
  templateUrl: './dispositivo-list.component.html',
  styleUrls: ['./dispositivo-list.component.css']
})
export class DispositivoListComponent implements OnInit {

  dispositivos: Dispositivo[] = [];
  editMode = false;
  dispositivoEdit: Dispositivo = new Dispositivo('', '', '', '', undefined);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['codigoSilo', 'descripcion', 'codigoSilobolsa', 'detalleSilobolsa', 'operations']
  // ,'operations'];
  dataSource!: MatTableDataSource<Dispositivo>;
  constructor(public dialog: MatDialog, public DispositivoService: DispositivoService, public storageService: StorageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.DispositivoService.DispositivoList(this.storageService.getCurrentUser().productoresID).toPromise().then((response: any) => {
      this.dataSource = new MatTableDataSource<Dispositivo>(response);
      this.dataSource.paginator = this.paginator;
    }).catch(error => {
      console.log('Error al obtener los dispositivos');
    });
  }


  deleteDispositivo(dispositivo: Dispositivo) {
    Swal.fire({
      title: 'Eliminar Dispositivo',
      text: '¿Desea eliminar el dispositivo ' + dispositivo.codigoSilo + '?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.DispositivoService.delete(dispositivo.ID).toPromise().then((respose: any) => {
          this.dataSource.data = this.dataSource.data.filter(
            (x) => x.ID != dispositivo.ID
          );
        }).catch(error => {
          Swal.fire('Error!', 'Dispositivo invalido!', 'error');
        });
        Swal.fire('Eliminado!', '', 'success');
      }
    })
  }

  editDispositivo(dispositivo: Dispositivo) {
    this.dispositivoEdit = dispositivo;
    this.editMode = false;
    this.openModelDispositivo();
  }

  newDispositivo() {
    this.editMode = true;
    const dialogRef = this.dialog.open(DispositivoAbmComponent, {
      data: new Dispositivo('', '', '', '', undefined)
    });
    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse) {
        this.loadData();
      }
    });
  }


  addDispositivo(dispositivo: Dispositivo) {
    this.dispositivos.push(dispositivo);
    this.loadData();
  }

  detailsDispositivo(dispositivo: Dispositivo) {
    const dialogRef = this.dialog.open(DispositivoViewComponent, {
      data: dispositivo
    });
  }


  openModelDispositivo() {
    let dispositivo: Dispositivo;

    if (this.editMode)
      dispositivo = new Dispositivo('', '', '', '', undefined);
    else
      dispositivo = this.dispositivoEdit;

    const dialogRef = this.dialog.open(DispositivoAbmComponent, {
      data: dispositivo
    });

    dialogRef.afterClosed().subscribe(Dispositivo => {
      if (Dispositivo) {
        if (Dispositivo.ID == '')
          this.addDispositivo(Dispositivo);
        else if (Dispositivo.ID != '')
          this.updateDispositivo(Dispositivo);
      }
    });
  }

  updateDispositivo(dispositivo: Dispositivo) {
    this.loadData();
  }

}
