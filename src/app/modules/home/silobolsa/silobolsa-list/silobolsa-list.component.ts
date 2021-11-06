import { Component, OnInit } from '@angular/core';
import { SilobolsaAbmComponent } from '../silobolsa-abm/silobolsa-abm.component'
import { Silobolsa } from '../../../../core/models/silobolsa.model';
import { SilobolsaService } from '../../../../core/services/silobolsa.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
      Swal.fire('Error!', 'Error al obtener las silobolsas!', 'error');
    });

  }

  deleteSilobolsa(silobolsa: Silobolsa) {
    Swal.fire({
      title: 'Eliminar silobolsa',
      text: '¿Desea eliminar la silobolsa ' + silobolsa.codigoSilo + '?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.silobolsaService.DeleteSilobolsa(silobolsa.ID).toPromise().then((respose: any) => {
          this.dataSource.data = this.dataSource.data.filter(
            (x) => x.ID != silobolsa.ID
          );
        }).catch(error => {
          Swal.fire('Error!', 'silobolsa invalida!', 'error');
        });
        Swal.fire('Eliminado!', '', 'success');
      }
    })
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

    this.router.navigate(['/silobolsa-monitor/detail', silobolsa.ID]);
  }

  openModelSilobolsa() {
    let silobolsa: Silobolsa;

    if (this.editMode)
      silobolsa = new Silobolsa('', '', '', new Date());
    else
      silobolsa = this.silobolsaEdit;

    const dialogRef = this.dialog.open(SilobolsaAbmComponent, {
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
    this.silobolsaService.UpdateSilobolsa(silobolsa.ID, silobolsa).toPromise().then((respose: any) => {
      this.dataSource.data = this.dataSource.data.filter(
        (x) => {
          if (x.ID == respose.data.id)
            x = respose;
          return true;
        });
      Swal.fire('Silobolsa actualizado!', '', 'success');
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
      Swal.fire('Silobolsa dada de alta!', '', 'success');
    }).catch(error => {
      console.log('silobolsa invalida');
    });
  }
}
