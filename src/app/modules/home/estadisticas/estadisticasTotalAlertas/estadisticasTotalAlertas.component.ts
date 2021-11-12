
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
  selector: 'estadisticasTotalAlertas',
  templateUrl: './estadisticasTotalAlertas.component.html',
  styleUrls: ['./estadisticasTotalAlertas.component.css']
})

export class EstadisticasTotalAlertasComponent {
  public type: ChartType;
  public data: Chartist.IChartistData;
  public options: any;

  public chartTypes: ChartType[];

  constructor() {
    this.chartTypes = ["Bar", "Line"];

    this.type = "Bar";
    this.data = data.Bar;
    this.options = {
      axisX: {
        showLabel: true,
      },
      axisY: {
        showLabel: true,
      },
    };
  }



}
