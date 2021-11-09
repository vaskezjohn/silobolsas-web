import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
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

export interface data {
  labels: string[];
  series: number[][];
}


@Component({
  selector: 'estadisticasPromedioMedidas',
  templateUrl: './estadisticasPromedioMedidas.component.html',
  styleUrls: ['./estadisticasPromedioMedidas.component.css']
})

export class EstadisticasPromedioMedidasComponent implements OnInit {

  barChart1: Chart = {
		type: 'Bar',
		data: data['Bar'],
		options: {
			seriesBarDistance: 15,
			high: 12,

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

  data!:data;

  constructor(public EstadisticasService: EstadisticasService, public storageService: StorageService ) { }

  ngOnInit(): void {
  }
}
