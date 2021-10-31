import { Component, OnInit } from '@angular/core';
import { SilobolsaNewComponent } from '../silobolsa-new/silobolsa-new.component'
import { Silobolsa } from '../models/silobolsa.model';
import { SilobolsaService } from '../service/silobolsa.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from 'src/app/authentication/services/storage.service';

@Component({
  selector: 'app-silobolsa-list',
  templateUrl: './silobolsa-list.component.html',
  styleUrls: ['./silobolsa-list.component.css']
})
export class SilobolsaListComponent implements OnInit {

  silobolsas: Silobolsa[] =[];

  displayedColumns: string[] = ['codigoSilo', 'tipoGrano','fechaEmbolsado','campos','detalle','operations'];
  dataSource!: MatTableDataSource<Silobolsa>;
  constructor(public dialog: MatDialog, public SilobolsaService: SilobolsaService, public storageService: StorageService) { }

  ngOnInit(): void {
    this.SilobolsaService.SilobolsasList(this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.silobolsas.push(new Silobolsa(item.codigoSilo, item.tipoGrano,item.fechaEmbolsado,item.longitud,item.latitud,item.camposId,item.campos,item.detalle)));
      this.dataSource = new MatTableDataSource(this.silobolsas);
    }).catch(error => {
      console.log('Error al obtener las silobolsas');
    });

  }

  deleteSilobolsa(Silobolsa: string){

  }

  editSilobolsa(Silobolsa: string){
  }

  newSilobolsa() {
    const dialogRef = this.dialog.open(SilobolsaNewComponent, {
      data: new Silobolsa('', '',new Date())
    });
    dialogRef.afterClosed().subscribe(Silobolsa => {
      if (Silobolsa != undefined)
        this.addSilobolsa(Silobolsa);
    });
  }

  addSilobolsa(silobolsa: Silobolsa) {
    this.silobolsas.push(new Silobolsa(silobolsa.codigoSilo, silobolsa.tipoGrano , silobolsa.fechaEmbolsado,silobolsa.longitud,silobolsa.latitud,silobolsa.camposId,silobolsa.campos, silobolsa.detalle));
    this.dataSource.data = this.silobolsas;
  }

  detailsSilobolsa(silobolsa: string) {

  }
}
