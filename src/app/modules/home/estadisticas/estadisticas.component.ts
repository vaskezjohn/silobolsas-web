import {Component, EventEmitter, OnInit,Output} from '@angular/core';
import { UnidadMedida } from 'src/app/core/models/unidadmedida.model';
import { EstadisticasService } from 'src/app/core/services/estadisticas.service';
import { UnidadMedidaService } from 'src/app/core/services/unidadmedida.service';

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
  unodidadesMedidas: UnidadMedida[] =[];
  constructor(public unidadMedidaService: UnidadMedidaService){

  }

  ngOnInit(): void {
    this.unidadMedidaService.UnidadMedidaList().toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.unodidadesMedidas.push(new UnidadMedida(item.id,item.descripcion,item.simbolo )));
    }).catch(error => {
      console.log('Error al obtener los campos');
    });

  }

}
