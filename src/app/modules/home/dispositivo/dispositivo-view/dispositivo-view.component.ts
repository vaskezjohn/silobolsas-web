import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Dispositivo} from '../../../../core/models/dispositivo.model'
import { DispositivoService } from '../../../../core/services/dispositivo.service';
import { formatDate  } from '@angular/common'

@Component({
  selector: 'app-dispositivo-view',
  templateUrl: './dispositivo-view.component.html',
  styleUrls: ['./dispositivo-view.component.css']
})
export class DispositivoViewComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DispositivoViewComponent>,
    @ Inject(MAT_DIALOG_DATA) public dispositivo: Dispositivo, public pdispositivoService: DispositivoService) { }


  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }
}
