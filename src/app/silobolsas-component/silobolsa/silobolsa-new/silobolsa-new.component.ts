import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Silobolsa } from '../models/silobolsa.model';

@Component({
  selector: 'app-silobolsa-new',
  templateUrl: './silobolsa-new.component.html',
  styleUrls: ['./silobolsa-new.component.css']
})
export class SilobolsaNewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SilobolsaNewComponent>,
    @ Inject(MAT_DIALOG_DATA) public silobolsa: Silobolsa) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

}
