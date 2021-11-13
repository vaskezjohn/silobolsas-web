
import { Component, Input, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

import { ChartType, ChartEvent } from 'ng-chartist';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { EstadisticasReqObject } from 'src/app/core/models/estadisticas-req-object.model';
import { EstadisticasAlertasReqObject } from 'src/app/core/models/estadisticas.alertas-req-object.model';
import { UnidadMedida } from 'src/app/core/models/unidadmedida.model';
import { EstadisticasService } from 'src/app/core/services/estadisticas.service';

//const data= require('./data.json');

export interface Chart {
	type: ChartType;
	data: Chartist.IChartistData;
	options?: any;
	responsiveOptions?: any;
	events?: ChartEvent;
}
declare var require: any;
const data= require('./data.json');

@Component({
  selector: 'estadisticasTotalAlertas',
  templateUrl: './estadisticasTotalAlertas.component.html',
  styleUrls: ['./estadisticasTotalAlertas.component.css']
})

export class EstadisticasTotalAlertasComponent implements OnInit {
  @Input () unidadMedida!: UnidadMedida;
 // @Input () unidadMedida!: string;
  barChart1: Chart = {
		type: 'Line',
		data: data,
		options: {
      showArea:true,
			seriesBarDistance: 15,
			axisX: {
				showGrid: false,
				offset: 20,
			},
			axisY: {
				showGrid: true,
				offset: 40,
			},
			height: 250

		},
		responsiveOptions: [
			[
				'screen and (min-width: 640px)',
				{
					axisX: {
						labelInterpolationFnc: function(value: number,index: number): string {
							return index % 1 === 0 ? `${value}` : '';
						}
					}
				}
			]
		]



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


    let estadisticasReqObject = new EstadisticasAlertasReqObject(fechaDesde,fechaHasta,productorId);
    this.EstadisticasService.TotalesAlertasBar(estadisticasReqObject).toPromise().then((respose: any) => {
      this.barChart1.data=respose;
      this.cargoGrafico = true;
    }).catch(error => {
      console.log('Error al obtener las estadisticas');
    });


  }
}
