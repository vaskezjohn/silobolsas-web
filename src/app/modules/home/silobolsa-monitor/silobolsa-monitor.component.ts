import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SilobolsaInfoDialogComponent } from './silobolsa-info-dialog/silobolsa-info-dialog.component'
import { ActivatedRoute } from '@angular/router';
import { Silobolsa } from '../../../core/models/silobolsa.model';
import { SilobolsaService } from '../../../core/services/silobolsa.service';
import { Productor } from '../../../core/models/productor.model';

@Component({
  selector: 'app-silobolsa-monitor',
  templateUrl: './silobolsa-monitor.component.html',
  styleUrls: ['./silobolsa-monitor.component.scss']
})
export class SilobolsaMonitorComponent implements OnInit, AfterViewInit{
  constructor(
    private route: ActivatedRoute,
    public silobolsaService: SilobolsaService,
    public dialog: MatDialog) { }
    
  silobolsa = new Silobolsa('', '', '', new Date());
  
  ngOnInit(): void {   
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.silobolsaService.silobolsaByID(id).toPromise().then((respose: any) => {
          
      console.log(respose);
        this.silobolsa = respose[0];
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


  openDialog(): void {
    console.log('dialog');
    const dialogRef = this.dialog.open(SilobolsaInfoDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
