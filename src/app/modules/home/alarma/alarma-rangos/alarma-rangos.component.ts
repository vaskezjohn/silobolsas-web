import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alarma } from '../../../../core/models/Alarma.model';
import { AlarmaService } from '../../../../core/services/alarma.service';
//import { Silobolsa } from 'src/app/core/models/silobolsa.model';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { Granos } from 'src/app/core/models/granos.model';
import { UnidadMedida } from 'src/app/core/models/unidadmedida.model';
import { Color } from 'src/app/core/models/color.model';
import { TipoNotificacion } from 'src/app/core/models/tiponotificacion.model';
import { User } from 'src/app/core/models/user.model';
import { AlarmaAbmComponent } from '../alarama-abm/alarma-abm.component';
import { AlarmaViewComponent } from '../alarma-view/alarma-view.component';






@Component({
  selector: 'app-alarma-rangos',
  templateUrl: './alarma-rangos.component.html',
  styleUrls: ['./alarma-rangos.component.css']
})
export class AlarmaRangosComponent implements OnInit {

  alarmas: Alarma[] =[];
  grano = "";
  unidadMedida = "";
  alarmaEdit!: Alarma;
  editMode = false;

  displayedColumns: string[] = ['color', 'minimo', 'maximo', 'descripcion', 'tipoNotificacion','usuarioNotificacion',  'operations']

  dataSource!: MatTableDataSource<Alarma>;

  constructor(private route : ActivatedRoute, public dialog: MatDialog, public AlarmaService: AlarmaService, public storageService : StorageService) { }

  ngOnInit(): void {
    var granosId: string | null;
    var unidadId: string | null;

    this.route.paramMap.subscribe(params => {
      if(params.has('granosId')  ){
        granosId = params.get('granosId');
      }

      if(params.has('unidadesMedidasID')){
        unidadId= params.get('unidadesMedidasID');
      }

    });

    this.AlarmaService.alarmaListExtendido(this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
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

    this.alarmas = this.alarmas.filter(a => a.granosID == granosId && a.unidadesMedidasID == unidadId );
    this.ordenarPorTemperatura();
    this.dataSource = new MatTableDataSource(this.alarmas);
    this.grano = this.alarmas[0].granos.descripcion;
    this.unidadMedida = this.alarmas[0].unidadesMedidas.descripcion + " " +  this.alarmas[0].unidadesMedidas.simbolo ;

   }).catch(error => {
     console.log('Error al obtener las alarmas', error);
   });

  }

  ordenarPorTemperatura(){
    this.alarmas.sort((a,b) => {
      if(a.minimo < b.minimo)
        return -1;

      if(a.minimo > b.minimo)
        return 1;

      return 0;
    });
  }

  newAlarma(){
    this.editMode = false;
    this.openModelAlarma();
  }

  editAlarma(alarma: Alarma){
    this.alarmaEdit = alarma;
    this.editMode = true;
    this.openModelAlarma();
  }

  openModelAlarma(){
    let alarma: Alarma;

    if (this.editMode)
      alarma = this.alarmaEdit;
    else
      alarma = new  Alarma('','','',this.alarmas[0].granosID, this.alarmas[0].granos, this.alarmas[0].unidadesMedidasID, this.alarmas[0].unidadesMedidas,0,0,'', new TipoNotificacion('',''),'', new Color('','',''),'',
                            new User('','','','','','','',''))


    const dialogRef = this.dialog.open(AlarmaAbmComponent, {
      data: {alarma : alarma, edit: this.editMode, rangoMode: true}
    });

    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse) {
        this.alarmas =[];
        if (respononse.ID == '' )
          this.addAlarma(respononse);
        else if (respononse.ID != '')
          this.updateAlarma(respononse);
      }
    });
  }

  addAlarma(alarma: Alarma) {
    this.alarmas.push(alarma);
    this .dataSource.data = this.alarmas;
  }

  updateAlarma(alarma: Alarma) {
    this.ngOnInit();
  }

  deleteAlarma(alarma: Alarma){
    Swal.fire({
      title:  'Eliminar Rango de alarma',
      text:  '¿Desea eliminar el rango entre ' + alarma.minimo +' y ' + alarma.maximo +'?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.AlarmaService.delete(alarma.id).toPromise().then((respose: any) => {
          this.dataSource.data = this.dataSource.data.filter(
            (x) => x.id != alarma.id
          );
        }).catch(error => {
          Swal.fire('Error!', 'Rango de alarma invalido!', 'error');
        });
        Swal.fire('Eliminado!', '', 'success');
      }
    })
  }

  detailsAlarma(alarma: Alarma) {
    const dialogRef = this.dialog.open(AlarmaViewComponent, {
      data: alarma
    });
  }
}
