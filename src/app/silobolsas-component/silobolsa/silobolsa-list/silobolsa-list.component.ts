import { Component, OnInit } from '@angular/core';
import { SilobolsaNewComponent } from '../silobolsa-new/silobolsa-new.component'
import { Silobolsa } from '../models/silobolsa.model';
import { SilobolsaService } from '../service/silobolsa.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from 'src/app/authentication/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-silobolsa-list',
  templateUrl: './silobolsa-list.component.html',
  styleUrls: ['./silobolsa-list.component.css']
})
export class SilobolsaListComponent implements OnInit {

  silobolsas: Silobolsa[] = [];
  editMode = false;
  silobolsaEdit: Silobolsa = new Silobolsa('', '', '', new Date());

  displayedColumns: string[] = ['codigoSilo', 'tipoGrano', 'fechaEmbolsado', 'campos', 'detalle', 'operations'];
  dataSource!: MatTableDataSource<Silobolsa>;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public silobolsaService: SilobolsaService,
    public storageService: StorageService) { }

  ngOnInit(): void {
    this.silobolsaService.SilobolsasList(this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.silobolsas.push(new Silobolsa(item.ID, item.codigoSilo, item.tipoGrano, item.fechaEmbolsado, item.longitud, item.latitud, item.camposID, item.campos, item.detalle)));
      this.dataSource = new MatTableDataSource(this.silobolsas);
    }).catch(error => {
      console.log('Error al obtener las silobolsas');
    });

  }

  deleteSilobolsa(silobolsaID: string) {
    this.silobolsaService.DeleteSilobolsa(silobolsaID).toPromise().then((respose: any) => {
      this.dataSource.data = this.dataSource.data.filter(
        (x) => x.ID != silobolsaID
      );
    }).catch(error => {
      console.log('silobolsa invalida');
    });
  }

  editSilobolsa(Silobolsa: Silobolsa) {
    this.silobolsaEdit = Silobolsa;    
    this.editMode = false;
    this.openModelSilobolsa();
  }

  newSilobolsa() {    
    this.editMode = true;
    this.openModelSilobolsa();
  }

  detailsSilobolsa(silobolsa: Silobolsa) {
    this.router.navigate(['/silobolsa-monitor']);
  }

  openModelSilobolsa() {
    let silobolsa: Silobolsa;

    if (this.editMode)
      silobolsa = new Silobolsa('', '', '', new Date());
    else
      silobolsa = this.silobolsaEdit;

    const dialogRef = this.dialog.open(SilobolsaNewComponent, {
      data: silobolsa
    });
    dialogRef.afterClosed().subscribe(Silobolsa => {
      if (Silobolsa) {
        if (Silobolsa.ID == '' && Silobolsa.tipoGrano != '' && Silobolsa.detalle != '' && Silobolsa.longitud != ''
          && Silobolsa.latitud != '' && Silobolsa.fechaEmbolsado != '' && Silobolsa.camposID != '')
          this.addSilobolsa(Silobolsa);
        else if (Silobolsa.ID != '')
          this.updateSilobolsa(Silobolsa);
      }

    });
  }

  updateSilobolsa(silobolsa: Silobolsa) {

    console.log("update",silobolsa);
    this.silobolsaService.UpdateSilobolsa(silobolsa.ID, silobolsa).toPromise().then((respose: any) => {
      console.log("updater",respose);
      this.dataSource.data = this.dataSource.data.filter(
        (x) => {
          if (x.ID == respose.data.id)
            x = respose;
          return true;
        });

    }).catch(error => {
      console.log('silobolsa invalida');
    });
  }

  addSilobolsa(silobolsa: Silobolsa) {
    this.silobolsaService.AddSilobolsa(silobolsa).toPromise().then((respose: any) => {
      this.silobolsas.push(new Silobolsa(respose.data.id,
        respose.data.codigoSilo,
        respose.data.tipoGrano,
        respose.data.fechaEmbolsado,
        respose.data.longitud,
        respose.data.latitud,
        respose.data.camposID,
        respose.data.campos,
        respose.data.detalle));
      this.dataSource.data = this.silobolsas;
    }).catch(error => {
      console.log('silobolsa invalida');
    });
  }
}
