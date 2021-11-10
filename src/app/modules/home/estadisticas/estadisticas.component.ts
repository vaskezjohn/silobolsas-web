import {Component, EventEmitter, OnInit,Output} from '@angular/core';

@Component({
  selector: 'estadisticas',
  styleUrls: ['estadisticas.component.css'],
  templateUrl: 'estadisticas.component.html',
})


export class EstadisticasComponent implements OnInit{
  temperaturaId ='525c1f84-3ea7-11ec-b9b8-883882e3ecf6';
  humedadId ='5d46ff54-3ea7-11ec-b9b8-883882e3ecf6';
  dioxidoId = '75daa939-3ea7-11ec-b9b8-883882e3ecf6';
  temperatura ='Temperatura';
  humedad ='Humedad';
  dioxido = 'Dioxido de carbono';
  constructor(){

  }

  ngOnInit(): void {

  }

}
