import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductorNewComponent } from '../productor-new/productor-new.component'
//import { CampoViewComponent } from '../campo-view/campo-view.component'
//import { CampoEditComponent } from '../campo-edit/campo-edit.component';
//import { CampoDeleteComponent } from '../campo-delete/campo-delete.component';
import { Productor } from '../models/productor.model';
import { ProductorService } from '../service/productor.service';

@Component({
  selector: 'app-productor-list',
  templateUrl: './productor-list.component.html',
  styleUrls: ['./productor-list.component.css']
})
export class ProductorListComponent implements OnInit {

  productores: Productor[] =[];

  displayedColumns: string[] = ['razonSocial', 'cuit', 'mail', 'provincia', 'localidad','operations'];
  dataSource!: MatTableDataSource<Productor>;
  constructor(public dialog: MatDialog, public ProductorService: ProductorService) { }

  ngOnInit(): void {
    this.ProductorService.ProductorList().toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.productores.push(new Productor(item.id,
                                                                          item.razonSocial,
                                                                          item.cuit,
                                                                          item.telefono,
                                                                          item.mail,
                                                                          item.fechaAlta,
                                                                          item.bajaLogica,
                                                                          item.localidadesID,
                                                                          item.localidades,
                                                                          item.calle,
                                                                          item.altura)));
      this.dataSource = new MatTableDataSource(this.productores);
    }).catch(error => {
      console.log('Error al obtener los productores');
    });

  }


  deleteProductor(campo: Productor){
   /*  const dialogRef = this.dialog.open(CampoDeleteComponent, {
      data: this.clone(campo)
    });
    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse){
        this.campos =[]
        this.ngOnInit();
      }
    }); */
  }

  editProductor(campo: Productor){
    /* const dialogRef = this.dialog.open(CampoEditComponent, {
      data: this.clone(campo)
    });
    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse){
        this.campos =[]
        this.ngOnInit();
      }
    }); */
  }

  newProductor() {
    const dialogRef = this.dialog.open(ProductorNewComponent, {
      data: new Productor('', '', '', '', '', '',false,1, new Object ,'','')
    });
    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse){
        this.productores =[]
        this.ngOnInit();
      }
    });
  }

  addProductor(campo: Productor) {
    /* this.campos.push(new Campo(campo.descripcion, campo.calle, campo.altura, campo.telefono, campo.mail));*/
    //this .dataSource.data = this.campos;
  }

  detailsProductor(campo: Productor) {
    /* console.log(campo.descripcion)
    const dialogRef = this.dialog.open(CampoViewComponent, {
      data: campo
    }); */
  }

  clone(productor: Productor): Productor {
    //var cloned = new Productor();
    //return cloned;
    return productor
  }

}
