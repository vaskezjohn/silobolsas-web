import { Component, OnInit } from '@angular/core';
import { SilobolsaNewComponent } from '../silobolsa-new/silobolsa-new.component'
import { Silobolsa } from '../models/silobolsa.model';
import { SilobolsaService } from '../service/silobolsa.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-silobolsa-list',
  templateUrl: './silobolsa-list.component.html',
  styleUrls: ['./silobolsa-list.component.css']
})
export class SilobolsaListComponent implements OnInit {

  silobolsas: Silobolsa[] =[];

  displayedColumns: string[] = ['codigoSilo', 'tipoGrano','fechaEmbolsado','detalle'];
  dataSource!: MatTableDataSource<Silobolsa>;
  constructor(public dialog: MatDialog, public SilobolsaService: SilobolsaService) { }

  ngOnInit(): void {
    this.SilobolsaService.SilobolsasList().toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.silobolsas.push(new Silobolsa(item.codigoSilo, item.tipoGrano,item.fechaEmbolsado,item.provinciasId,item.localidadesId,item.productoresId,item.detalle)));
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
    this.silobolsas.push(new Silobolsa(silobolsa.codigoSilo, silobolsa.tipoGrano , silobolsa.fechaEmbolsado,silobolsa.provinciasId,silobolsa.localidadesId,silobolsa.productoresId, silobolsa.detalle));
    this.dataSource.data = this.silobolsas;
  }

  detailsSilobolsa(silobolsa: string) {

  }
}
