
import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { withLatestFrom } from 'rxjs-compat/operator/withLatestFrom';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { EstadisticasReqObject } from 'src/app/core/models/estadisticas-req-object.model';
import { EstadisticasResObject } from 'src/app/core/models/estatidiscas-res-object.model';
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
  selector: 'estadisticasPromedioMedidas',
  templateUrl: './estadisticasPromedioMedidas.component.html',
  styleUrls: ['./estadisticasPromedioMedidas.component.css']
})

export class EstadisticasPromedioMedidasComponent implements OnInit {
  estadisticasReqObject!:EstadisticasReqObject;
  estadisticasResObject!:EstadisticasResObject;


  barChart1: Chart = {
		type: 'Bar',
		data: data,
		options: {
			seriesBarDistance: 15,
			axisX: {
				showGrid: false,
				offset: 20
			},
			axisY: {
				showGrid: true,
				offset: 40
			},
			height: 360
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

    this.EstadisticasService.MedicionesPromedioBar(this.estadisticasReqObject).toPromise().then((respose: any) => {
      this.barChart1.data=respose;
      this.cargoGrafico = true;
    }).catch(error => {
      console.log('Error al obtener las estadisticas');
    });


    /*data.labels = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    data.series = [
      [5, 4, 3, 7, 5, 10, 3, 4, 8, 22, 6, 8],
      [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
    ];
  */
  }
}
