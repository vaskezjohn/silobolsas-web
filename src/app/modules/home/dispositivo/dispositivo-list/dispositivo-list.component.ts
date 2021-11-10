import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DispositivoAbmComponent } from '../dispositivo-abm/dispositivo-abm.component'
import { DispositivoViewComponent } from '../dispositivo-view/dispositivo-view.component';
import { Dispositivo } from '../../../../core/models/dispositivo.model';
import { DispositivoService } from '../../../../core/services/dispositivo.service';
import { Silobolsa } from 'src/app/core/models/silobolsa.model';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/core/authentication/services/storage.service';




@Component({
  selector: 'app-dispositivo-list',
  templateUrl: './dispositivo-list.component.html',
  styleUrls: ['./dispositivo-list.component.css']
})
export class DispositivoListComponent implements OnInit {

  dispositivos: Dispositivo[] =[];
  editMode = false;
  dispositivoEdit: Dispositivo = new Dispositivo('', '', '', '', undefined);

  displayedColumns: string[] = ['codigo', 'descripcion', 'codigoSilobolsa', 'detalleSilobolsa', 'operations']
  // ,'operations'];
  dataSource!: MatTableDataSource<Dispositivo>;
  constructor(public dialog: MatDialog, public DispositivoService: DispositivoService, public storageService : StorageService) { }

  ngOnInit(): void {
    this.dispositivos = [];
    this.DispositivoService.DispositivoList(this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.dispositivos.push(new Dispositivo(item.ID,
                                                                          item.codigoSilo,
                                                                          item.descripcion,
                                                                          item.silobolsasID,
                                                                          item.silobolsas
                                                                        )));
      this.dataSource = new MatTableDataSource(this.dispositivos);
      console.log('dispositivos',this.dispositivos)
    }).catch(error => {
      console.log('Error al obtener los dispositivos');
    });

  }


  deleteDispositivo(dispositivo: Dispositivo){
    Swal.fire({
      title:  'Eliminar Dispositivo',
      text:  '¿Desea eliminar el dispositivo ' + dispositivo.codigo +'?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.DispositivoService.delete(dispositivo.id).toPromise().then((respose: any) => {
          this.dataSource.data = this.dataSource.data.filter(
            (x) => x.id != dispositivo.id
          );
        }).catch(error => {
          Swal.fire('Error!', 'Dispositivo invalido!', 'error');
        });
        Swal.fire('Eliminado!', '', 'success');
      }
    })
  }

  editDispositivo(dispositivo: Dispositivo){
    this.dispositivoEdit = dispositivo;
    this.editMode = false;
    this.openModelDispositivo();
  }

  newDispositivo() {
    this.editMode = true;
    const dialogRef = this.dialog.open(DispositivoAbmComponent, {
      data: new Dispositivo('','','','', undefined)
    });
    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse){
        this.dispositivos =[]
        this.ngOnInit();
      }
    });
  }


  addDispositivo(dispositivo: Dispositivo) {
    this.dispositivos.push(dispositivo);
    this .dataSource.data = this.dispositivos;
  }

  detailsDispositivo(dispositivo: Dispositivo) {
    const dialogRef = this.dialog.open(DispositivoViewComponent, {
      data: dispositivo
    });
  }


  openModelDispositivo() {
    let dispositivo: Dispositivo;

    if (this.editMode)
      dispositivo = new Dispositivo('','','','',undefined);
    else
      dispositivo = this.dispositivoEdit;

    const dialogRef = this.dialog.open(DispositivoAbmComponent, {
      data: dispositivo
    });

    dialogRef.afterClosed().subscribe(Dispositivo => {
      if (Dispositivo) {
        if (Dispositivo.ID == '' )
          this.addDispositivo(Dispositivo);
        else if (Dispositivo.ID != '')
          this.updateDispositivo(Dispositivo);
      }
    });
  }

  updateDispositivo(dispositivo: Dispositivo) {
    this.ngOnInit();
   /*  this.DispositivoService.edit(dispositivo.id, dispositivo).toPromise().then((respose: any) => {
      this.dataSource.data = this.dataSource.data.filter(
        (x) => {
          if (x.id == respose.data.id)
            x = respose;
          return true;
        });
    }).catch(error => {
      console.log('Dispositivo invalido');
    }); */
  }

}
