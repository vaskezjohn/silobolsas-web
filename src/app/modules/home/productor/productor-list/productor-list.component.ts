import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductorAbmComponent } from '../productor-abm/productor-abm.component'
import { ProductorViewComponent } from '../productor-view/productor-view.component';
import { Productor } from '../../../../core/models/productor.model';
import { ProductorService } from '../../../../core/services/productor.service';
import Swal from 'sweetalert2';
import { Localidades } from 'src/app/core/models/localidades.model';
import { Provincias } from 'src/app/core/models/provincia.model';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-productor-list',
  templateUrl: './productor-list.component.html',
  styleUrls: ['./productor-list.component.css']
})
export class ProductorListComponent implements OnInit {

  productores: Productor[] = [];
  editMode = false;
  productorEdit: Productor = new Productor('', '', '', '', '', new Date, false, 1, new Localidades(1, '', 1, 4, new Provincias(1, '')), '', '');

  displayedColumns: string[] = ['razonSocial', 'cuit', 'mail', 'provincia', 'localidad', 'operations'];
  dataSource!: MatTableDataSource<Productor>;
  constructor(public dialog: MatDialog, public ProductorService: ProductorService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.ProductorService.ProductorList().toPromise().then((response: any) => {
      this.dataSource = new MatTableDataSource<Productor>(response);
      this.dataSource.paginator = this.paginator;
      // response.forEach((item: any) => this.productores.push(new Productor(item.ID,
      //                                                                     item.razonSocial,
      //                                                                     item.cuit,
      //                                                                     item.telefono,
      //                                                                     item.mail,
      //                                                                     item.fechaAlta,
      //                                                                     item.bajaLogica,
      //                                                                     item.localidadesID,
      //                                                                     item.localidades,
      //                                                                     item.calle,
      //                                                                     item.altura)));
      // this.dataSource = new MatTableDataSource(this.productores);
    }).catch((error: any) => {
      console.log('Error al obtener los productores');
    });
  }


  deleteProductor(productor: Productor) {
    Swal.fire({
      title: 'Eliminar Productor',
      text: '¿Desea eliminar al productor ' + productor.razonSocial + '?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ProductorService.delete(productor.ID).toPromise().then((respose: any) => {
          this.dataSource.data = this.dataSource.data.filter(
            (x) => x.ID != productor.ID
          );
        }).catch(error => {
          Swal.fire('Error!', 'Productor invalido!', 'error');
        });
        Swal.fire('Eliminado!', '', 'success');
      }
    })
  }

  editProductor(productor: Productor) {
    this.productorEdit = productor;
    this.editMode = false;
    this.openModelProductor();
  }

  newProductor() {
    this.editMode = true;
    const dialogRef = this.dialog.open(ProductorAbmComponent, {
      data: new Productor('', '', '', '', '', new Date, false, 1, new Localidades(1, '', 1, 4, new Provincias(1, '')), '', '')
    });
    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse) {
        this.productores = []
        this.ngOnInit();
      }
    });
  }

  addProductor(productor: Productor) {
    this.productores.push(productor);
    this.dataSource.data = this.productores;
  }

  detailsProductor(productor: Productor) {
    const dialogRef = this.dialog.open(ProductorViewComponent, {
      data: productor
    });
  }

  openModelProductor() {
    let productor: Productor;

    if (this.editMode)
      productor = new Productor('', '', '', '', '', new Date, false, 1, new Localidades(1, '', 1, 4, new Provincias(1, '')), '', '');
    else
      productor = this.productorEdit;

    const dialogRef = this.dialog.open(ProductorAbmComponent, {
      data: productor
    });

    dialogRef.afterClosed().subscribe(Productor => {
      if (Productor) {
        if (Productor.ID == '')
          this.addProductor(Productor);
        else if (Productor.ID != '')
          this.updateProductor(Productor);
      }
    });
  }

  updateProductor(productor: Productor) {
    console.log(productor);
    this.ProductorService.edit(productor.ID, productor).toPromise().then((respose: any) => {
      this.dataSource.data = this.dataSource.data.filter(
        (x) => {
          if (x.ID == respose.data.ID)
            x = respose.data;
          return true;
        });
    }).catch(error => {
      console.log('Productor invalido');
    });
  }

}
