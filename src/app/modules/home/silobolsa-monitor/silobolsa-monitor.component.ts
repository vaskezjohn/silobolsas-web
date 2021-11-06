import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SilobolsaInfoDialogComponent } from './silobolsa-info-dialog/silobolsa-info-dialog.component'
import { ActivatedRoute } from '@angular/router';
import { Silobolsa } from '../../../core/models/silobolsa.model';
import { SilobolsaService } from '../../../core/services/silobolsa.service';
import { Productor } from '../../../core/models/productor.model';
import { Dispositivo } from 'src/app/core/models/dispositivo.model';
import { DispositivoService } from 'src/app/core/services/dispositivo.service';

@Component({
  selector: 'app-silobolsa-monitor',
  templateUrl: './silobolsa-monitor.component.html',
  styleUrls: ['./silobolsa-monitor.component.scss']
})
export class SilobolsaMonitorComponent implements OnInit, AfterViewInit {

  @Input() silobolsaID!: string;

  position = {
    lat: -34.366452482149924,
    lng: -58.58322545706875
  };

  constructor(
    private route: ActivatedRoute,
    public silobolsaService: SilobolsaService,
    public dispositivoService: DispositivoService,
    public dialog: MatDialog) { }

  dispostivos: Dispositivo[] = [
    new Dispositivo('', '', '', ''),
    new Dispositivo('', '', '', ''),
    new Dispositivo('', '', '', ''),
    new Dispositivo('', '', '', ''),
    new Dispositivo('', '', '', ''),
    new Dispositivo('', '', '', ''),
    new Dispositivo('', '', '', ''),
    new Dispositivo('', '', '', '')
  ];
  silobolsa = new Silobolsa('', '', '', new Date());


  ngOnInit(): void {

    if(!this.silobolsaID){
      let id:string = this.route.snapshot.paramMap.get('id')!;
      this.silobolsaID=id;
    }

    if (this.silobolsaID) {
      this.silobolsaService.silobolsaByID(this.silobolsaID).toPromise().then((respose: any) => {
        this.silobolsa = respose[0];
      }).catch(error => {
        console.log('silobolsa invalida');
      });

      this.dispositivoService.DispositivoListBySilobolasID(this.silobolsaID).toPromise().then((respose: any) => {
        console.log(respose);
        for (let i = 0; i < 8; i++) {
          console.log(respose[i]);
          if (respose[i]) {
            this.dispostivos[i].id = respose[i].ID;
            this.dispostivos[i].codigoSilo = respose[i].codigoSilo;
            this.dispostivos[i].silobolsasID = respose[i].silobolsasID;
            this.dispostivos[i].silobolsas = respose[i].silobolsas;
            this.dispostivos[i].id = respose[i].ID;
            this.dispostivos[i].id = respose[i].ID;
          }
        }
      }).catch(error => {
        console.log('silobolsa invalida');
      });

      // this.silobolsaService.silobolsaByID(id).subscribe({
      //   next(respose) {
      //     console.log("res",respose);
      //     silobolsa = respose[0];
      //   },
      //   complete() {
      //     base.silobolsa.tipoGrano = silobolsa.tipoGrano;
      //   }
      // })
    }
  }

  ngAfterViewInit() {

  }


  openDialog(dispostivo: Dispositivo): void {
    console.log('dialog');
    const dialogRef = this.dialog.open(SilobolsaInfoDialogComponent, {
      data: dispostivo,
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
