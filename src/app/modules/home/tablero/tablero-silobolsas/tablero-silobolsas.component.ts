import { Component, Input, OnInit } from '@angular/core';
import { Campo } from 'src/app/core/models/campo.model';


@Component({
  selector: 'tablero-silobolsas',
  templateUrl: './tablero-silobolsas.component.html',
  styleUrls: ['./tablero-silobolsas.component.css']
})
export class TableroSilobolsasComponent implements OnInit  {

  @Input() campo!: Campo;
  panelOpenState = false;

  constructor() {
   }

   ngOnInit() {

  }



}
