import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Campo} from '../../../../core/models/campo.model'
import { CampoService } from '../../../../core/services/campo.service';

@Component({
  selector: 'app-campo-view',
  templateUrl: './campo-view.component.html',
  styleUrls: ['./campo-view.component.css']
})
export class CampoViewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CampoViewComponent>,
    @ Inject(MAT_DIALOG_DATA) public campo: Campo, public campoService: CampoService) { }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }
}
