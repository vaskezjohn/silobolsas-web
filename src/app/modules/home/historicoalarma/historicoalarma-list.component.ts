import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import Swal from 'sweetalert2';
import { HistoricoAlarmaService } from 'src/app/core/services/historicoalarma.service';
import { HistoricoAlarma } from 'src/app/core/models/historicoalarma.model';

@Component({
  selector: 'app-historicoalarma-list',
  templateUrl: './historicoalarma-list.component.html',
  styleUrls: ['./historicoalarma-list.component.css']
})

export class HistoricoAlarmaListComponent implements OnInit {
  historicoalarma: HistoricoAlarma[] =[];

  constructor(public dialog: MatDialog, public HistoricoAlarmaService: HistoricoAlarmaService, public storageService: StorageService) { }

  ngOnInit(): void {
    this.HistoricoAlarmaService.HistoricoAlarmaList(this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.historicoalarma.push(new HistoricoAlarma(item.descripcion)));

     // this.dataSource = new MatTableDataSource(this.campos);
    }).catch(error => {
      console.log('Error al obtener los campos');
    });

  }

}
