import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alarma } from '../../../../core/models/Alarma.model';
import { AlarmaService } from '../../../../core/services/alarma.service';
//import { Silobolsa } from 'src/app/core/models/silobolsa.model';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { Router } from '@angular/router';
import { AlarmaAbmComponent } from '../alarama-abm/alarma-abm.component';
import { Granos } from 'src/app/core/models/granos.model';
import { UnidadMedida } from 'src/app/core/models/unidadmedida.model';
import { TipoNotificacion } from 'src/app/core/models/tiponotificacion.model';
import { Color } from 'src/app/core/models/color.model';
import { User } from 'src/app/core/models/user.model';




@Component({
  selector: 'app-alarma-list',
  templateUrl: './alarma-list.component.html',
  styleUrls: ['./alarma-list.component.css']
})
export class AlarmaListComponent implements OnInit {

  alarmas: Alarma[] =[];
  alarmasAgrupadas: Alarma[] =[];
  //nuevoArray: Alarma[] =[];
  //editMode = false;
  //dispositivoEdit: Dispositivo = new Dispositivo('', '', '', '', undefined);

  //displayedColumns: string[] = ['codigo', 'descripcion', 'codigoSilobolsa', 'detalleSilobolsa', 'operations']

  //dataSource!: MatTableDataSource<Dispositivo>;
  constructor(private router: Router, public dialog: MatDialog, public AlarmaService: AlarmaService, public storageService : StorageService) { }

  ngOnInit(): void {
    this.alarmas = [];

    this.AlarmaService.alarmaList(this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.alarmas.push(new Alarma(item.ID,
                                                                  item.productoresID ,
                                                                  item.descripcion,
                                                                  item.granosID,
                                                                  item.granos,
                                                                  item.unidadesMedidasID,
                                                                  item.unidadesMedidas,
                                                                  item.minimo,
                                                                  item.maximo,
                                                                  item.tiposNotificacionesID,
                                                                  item.tiposNotificaciones,
                                                                  item.coloresID,
                                                                  item.colores,
                                                                  item.usuarioDestinoID,
                                                                  item.usuarioDestino
                                                                  )));

      //this.dataSource = new MatTableDataSource(this.dispositivos);
      this.ordenarPorGrano();
      this.agruparPorGranoYMedida();
    }).catch(error => {
      console.log('Error al obtener las alarmas', error);
    });

  }

  ordenarPorGrano(){
    this.alarmas.sort((a,b) => {
      if(a.granos.descripcion < b.granos.descripcion)
        return -1;

      if(a.granos.descripcion > b.granos.descripcion)
        return 1;

      return 0;
    });
  }

  //Agrupo por grano y tipo de medición
  agruparPorGranoYMedida(){
    var arrayTemporal = []

    for(var i=0; i<this.alarmas.length; i++){
        arrayTemporal = this.alarmasAgrupadas.filter(resp => resp["granos"].descripcion == this.alarmas[i]["granos"].descripcion && resp["unidadesMedidas"].descripcion == this.alarmas[i]["unidadesMedidas"].descripcion)
        if(arrayTemporal.length==0){
          this.alarmasAgrupadas.push(this.alarmas[i]);
        }
    }
  }

  editarAlarma(alarma : Alarma){
    this.router.navigate(['/alarma-rangos', alarma.granosID, alarma.unidadesMedidasID]);
  }


  newAlarma(){
    var alarmaNew = new Alarma('','','','',new Granos('',''),'', new UnidadMedida('','',''),0,0,'', new TipoNotificacion('',''),'', new Color('','',''),'',
                            new User('','','','','','','','')) ;

    const dialogRef = this.dialog.open(AlarmaAbmComponent, {
      data: {alarma : alarmaNew , edit : false, rangoMode : false}
    });

    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse){
        //this.dispositivos =[]
        this.ngOnInit();
      }
    });
  }

/*
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
  }
 */
}
