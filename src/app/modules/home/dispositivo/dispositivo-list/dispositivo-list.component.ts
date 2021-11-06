import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DispositivoAbmComponent } from '../dispositivo-abm/dispositivo-abm.component'
/*import { ProductorViewComponent } from '../productor-view/productor-view.component'; */
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

  displayedColumns: string[] = ['codigoSilo', 'descripcion', 'codigoSilobolsa', 'detalleSilobolsa']
  // ,'operations'];
  dataSource!: MatTableDataSource<Dispositivo>;
  constructor(public dialog: MatDialog, public DispositivoService: DispositivoService, public storageService : StorageService) { }

  ngOnInit(): void {
    console.log('idprod', this.storageService.getCurrentUser().productoresID)
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
   /*  Swal.fire({
      title:  'Eliminar Productor',
      text:  '¿Desea eliminar al productor ' + productor.razonSocial +'?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ProductorService.delete(productor.id).toPromise().then((respose: any) => {
          this.dataSource.data = this.dataSource.data.filter(
            (x) => x.id != productor.id
          );
        }).catch(error => {
          Swal.fire('Error!', 'Productor invalido!', 'error');
        });
        Swal.fire('Eliminado!', '', 'success');
      }
    }) */
  }

  editDispositivo(dispositivo: Dispositivo){
    /* this.productorEdit = productor;
    this.editMode = false;
    this. openModelProductor();
    */
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

  /*
  addProductor(productor: Productor) {
    this.productores.push(productor);
    this .dataSource.data = this.productores;
  }
*/
  detailsDispositivo(dispositivo: Dispositivo) {
    /* console.log(productor.fechaAlta)
    const dialogRef = this.dialog.open(ProductorViewComponent, {
      data: productor
    });*/
  }

  /*
  openModelProductor() {
    let productor: Productor;

    if (this.editMode)
      productor = new Productor('', '', '', '', '', new Date,false,1, new Localidad(1,'',1,4, new Provincia(1,'')) ,'','');
    else
      productor = this.productorEdit;

    const dialogRef = this.dialog.open(ProductorAbmComponent, {
      data: productor
    });

    dialogRef.afterClosed().subscribe(Productor => {
      if (Productor) {
        if (Productor.ID == '' )
          this.addProductor(Productor);
        else if (Productor.ID != '')
          this.updateProductor(Productor);
      }
    });
  }

  updateProductor(productor: Productor) {
    this.ProductorService.edit(productor.id, productor).toPromise().then((respose: any) => {
      this.dataSource.data = this.dataSource.data.filter(
        (x) => {
          if (x.id == respose.data.id)
            x = respose;
          return true;
        });
    }).catch(error => {
      console.log('Productor invalido');
    });
  } */

}
