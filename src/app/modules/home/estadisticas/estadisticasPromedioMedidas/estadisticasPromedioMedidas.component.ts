
import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'estadisticasPromedioMedidas',
  templateUrl: './estadisticasPromedioMedidas.component.html',
  styleUrls: ['./estadisticasPromedioMedidas.component.css']
})

export class EstadisticasPromedioMedidasComponent implements OnInit {
  @Input () unidadMedida!: UnidadMedida;
 // @Input () unidadMedida!: string;
  barChart1: Chart = {
		type: 'Bar',
		data: data,
		options: {
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

    const temperaturaId ='525c1f84-3ea7-11ec-b9b8-883882e3ecf6';
    const humedadId ='5d46ff54-3ea7-11ec-b9b8-883882e3ecf6';
    const dioxidoId = '75daa939-3ea7-11ec-b9b8-883882e3ecf6';
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var fechaDesde = '2021-04-09T21:47:16.703Z';
    var fechaHasta = '2022-12-09T21:47:16.703Z';
    var productorId = this.storageService.getCurrentUser().productoresID;


    let estadisticasReqObject = new EstadisticasReqObject(fechaDesde,fechaHasta,productorId,this.unidadMedida.id);
    this.EstadisticasService.MedicionesPromedioBar(estadisticasReqObject).toPromise().then((respose: any) => {
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
