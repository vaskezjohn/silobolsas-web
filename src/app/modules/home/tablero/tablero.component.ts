import {AfterViewInit, Component, EventEmitter, OnInit,Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { Campo } from 'src/app/core/models/campo.model';
import { UnidadMedida } from 'src/app/core/models/unidadmedida.model';
import { CampoService } from 'src/app/core/services/campo.service';
import { UnidadMedidaService } from 'src/app/core/services/unidadmedida.service';

@Component({
  selector: 'tablero',
  styleUrls: ['tablero.component.css'],
  templateUrl: 'tablero.component.html',
})


export class TableroComponent implements AfterViewInit {
  campos: Campo[] =[];
  unidadesMedidas: UnidadMedida[] = [];

  constructor(public dialog: MatDialog, public campoService: CampoService, public unidadMedidaService: UnidadMedidaService, public storageService: StorageService) { }

  ngAfterViewInit(): void {
    this.campoService.CampoList(this.storageService.getCurrentUser().productoresID).toPromise().then((response: any) => {
      response.forEach((item: any) => this.campos.push(new Campo(item.descripcion, item.calle, item.altura, item.telefono, item.mail, item.ID, item.localidadesID, item.productoresID, item.localidades,item.silobolsas)));
    }).catch(error => {
      console.log('Error al obtener los campos');
    });

    this.unidadMedidaService.UnidadMedidaList().toPromise().then((response: any) => {
      response.forEach((item: any) => this.unidadesMedidas.push(new UnidadMedida(item.id, item.descripcion , item.simbolo)));
    }).catch(error => {
      console.log('Error al obtener los campos');
    });
  }

}
