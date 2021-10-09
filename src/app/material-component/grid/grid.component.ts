import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SilobolsaInfoDialogComponent } from './silobolsa-info-dialog/silobolsa-info-dialog.component'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  constructor(public dialog: MatDialog) {}

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
