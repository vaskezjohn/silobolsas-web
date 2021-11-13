import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { EstadisticasEstadoGeneralPieReqObject } from 'src/app/core/models/estadisticas-req-object.model';
import { EstadisticasService } from 'src/app/core/services/estadisticas.service';
declare var require: any;

const data= require('./data.json');

export interface Chart {
	type: ChartType;
	data: Chartist.IChartistData;
	options?: any;
	responsiveOptions?: any;
	events?: ChartEvent;
}

@Component({
  selector: 'estadisticasEstadoGeneral',
  templateUrl: './estadisticasEstadoGeneral.component.html',
  styleUrls: ['./estadisticasEstadoGeneral.component.css']
})
export class EstadisticasEstadoGeneralComponent implements OnInit {

  donuteChart1: Chart = {
		type: 'Pie',
		data: data['Pie'],
		options: {
			donut: true,
			height: 260,
			showLabel: false,
			donutWidth: 20
		}
	};

  constructor(public EstadisticasService: EstadisticasService, public storageService: StorageService) {


  }
  public cargoGrafico = false;

  ngOnInit(): void {


    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var fechaDesde = '2020-01-09T21:47:16.703Z';
    var fechaHasta = '2022-12-09T21:47:16.703Z';
    var productorId = this.storageService.getCurrentUser().productoresID;


    let objRequest = new EstadisticasEstadoGeneralPieReqObject(productorId);
    this.EstadisticasService.EstadoGeneralPie(objRequest).toPromise().then((respose: any) => {
      this.donuteChart1.data=respose;
      this.cargoGrafico = true;
    }).catch(error => {
      console.log('Error al obtener las estadisticas');
    });


  }

}
