import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dispositivo } from 'src/app/core/models/dispositivo.model';

@Component({
  selector: 'app-silobolsa-info-dialog',
  templateUrl: './silobolsa-info-dialog.component.html',
  styleUrls: ['./silobolsa-info-dialog.component.css']
})
export class SilobolsaInfoDialogComponent  implements OnInit   {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dispositivo: Dispositivo){}

  ngOnInit(): void {
   console.log(this.dispositivo);
  }


}


