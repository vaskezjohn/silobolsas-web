import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Granos } from 'src/app/core/models/granos.model';
import { GranosService } from 'src/app/core/services/granos.service';
import Swal from 'sweetalert2';
import { GranosAbmComponent } from '../granos-abm/granos-abm.component';

@Component({
  selector: 'app-granos-list',
  templateUrl: './granos-list.component.html',
  styleUrls: ['./granos-list.component.css']
})
export class GranosListComponent implements OnInit {

  granos: Granos[] = [];
  editMode = false;

  displayedColumns: string[] = ['descripcion', 'operations'];
  dataSource!: MatTableDataSource<Granos>;
  constructor(public dialog: MatDialog, public granosService: GranosService) { }

  ngOnInit(): void {
    this.setList();
  }


  deleteGrano(grano: Granos) {
    Swal.fire({
      title: 'Eliminar Grano',
      text: '¿Desea eliminar al grano ' + grano.descripcion + '?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.granosService.DeleteGranos(grano.ID).toPromise().then((respose: any) => {
          this.dataSource.data = this.dataSource.data.filter(
            (x) => x.ID != grano.ID
          );
        }).catch(error => {
          Swal.fire('Error!', 'Grano invalido!', 'error');
        });
        Swal.fire('Eliminado!', '', 'success');
      }
    })
  }

  editGrano(grano: Granos) {
    this.editMode = true;
    this.openModelGrano(grano);
  }

  newGrano() {
    this.editMode = false;
    this.openModelGrano(new Granos('', ''));
  }

  // detailsGrano(grano: Granos) {
  //   const dialogRef = this.dialog.open(GranoViewComponent, {
  //     data: grano
  //   });
  // }

  openModelGrano(grano: Granos) {
    const dialogRef = this.dialog.open(GranosAbmComponent, {
      data: [{ grano: grano, editMode: this.editMode }]
    });

    dialogRef.afterClosed().subscribe(grano => {
      console.log("close",grano);
      if (grano) {
        if (grano.ID == '')
          this.addGrano(grano);
        else
          this.updateGrano(grano);
      }
    });
  }

  setList() {
    this.granosService.GranosList().toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.granos.push(new Granos(item.id, item.descripcion)));
      this.dataSource = new MatTableDataSource(this.granos);
    }).catch((error: any) => {
      console.log('Error al obtener los granos');
    });

  }

  addGrano(grano: Granos) {
    this.granos.push(grano);
    this.dataSource.data = this.granos;
  }

  updateGrano(grano: Granos) {
    this.dataSource.data = this.dataSource.data.filter(
      (x) => {
        if (x.ID == grano.ID)
          x = grano;
        return true;
      });
  }

}
