import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Campo } from '../models/campo.model'

@Component({
  selector: 'app-campo-new',
  templateUrl: './campo-new.component.html',
  styleUrls: ['./campo-new.component.css']
})
export class CampoNewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CampoNewComponent>,
    @ Inject(MAT_DIALOG_DATA) public campo: Campo) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

}
