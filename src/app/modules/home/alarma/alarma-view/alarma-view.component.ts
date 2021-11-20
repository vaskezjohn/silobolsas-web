import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Alarma} from '../../../../core/models/alarma.model'
import { AlarmaService } from '../../../../core/services/alarma.service';
import { formatDate  } from '@angular/common'

@Component({
  selector: 'app-alarma-view',
  templateUrl: './alarma-view.component.html',
  styleUrls: ['./alarma-view.component.css']
})
export class AlarmaViewComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AlarmaViewComponent>,
    @ Inject(MAT_DIALOG_DATA) public alarma: Alarma, public alarmaService: AlarmaService) { }


  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }
}
