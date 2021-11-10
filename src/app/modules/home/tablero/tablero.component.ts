import {AfterViewInit, Component, EventEmitter, OnInit,Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { Campo } from 'src/app/core/models/campo.model';
import { CampoService } from 'src/app/core/services/campo.service';

@Component({
  selector: 'tablero',
  styleUrls: ['tablero.component.css'],
  templateUrl: 'tablero.component.html',
})


export class TableroComponent implements AfterViewInit {
  campos: Campo[] =[];

  constructor(public dialog: MatDialog, public CampoService: CampoService, public storageService: StorageService) { }

  ngAfterViewInit(): void {
    this.CampoService.CampoList(this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.campos.push(new Campo(item.descripcion, item.calle, item.altura, item.telefono, item.mail, item.ID, item.localidadesID, item.productoresID, item.localidades,item.silobolsas)));
    }).catch(error => {
      console.log('Error al obtener los campos');
    });
  }

}
