import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { HistoricoAlarma } from 'src/app/core/models/historicoalarma.model';
import { HistoricoAlarmaService } from 'src/app/core/services/historicoalarma.service';

/*
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
*/

@Component({
  selector: 'thistoricoalarma-list',
  styleUrls: ['historicoalarma-list.component.css'],
  templateUrl: 'historicoalarma-list.component.html',
})
export class HistoricoAlarmaListComponent implements OnInit{
  displayedColumns: string[] = ['fecha',
                                'ubicacion',
                                'unidadmedida',
                                'valor',
                                'rango',
                                'usuario'
                              ];
  dataSource!: MatTableDataSource<HistoricoAlarma>;
  alarmas: HistoricoAlarma[] =[];


  constructor(public HistoricoAlarmaService: HistoricoAlarmaService, public storageService: StorageService) { }

  ngOnInit(): void {
    this.HistoricoAlarmaService.HistoricoAlarmaList(this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.alarmas.push(new HistoricoAlarma(item.ID,
        item.valor,
        item.descripcion,
        item.fechaHora,
        item.valorMinimo,
        item.valorMaximo,
        item.dispositivosID,
        item.dispositivos,
        item.silobolsasID,
        item.silobolsas,
        item.usuariosID,
        item.usuarios,
        item.unidadesMedidasID,
        item.unidadesMedidas,
        item.tiposNotificacionesID,
        item.tiposNotificaciones,
        item.coloresID,
        item.colores)));
      this.dataSource = new MatTableDataSource(this.alarmas);
      console.log('alertas',this.alarmas)
    }).catch(error => {
      console.log('Error al obtener alertas');
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}