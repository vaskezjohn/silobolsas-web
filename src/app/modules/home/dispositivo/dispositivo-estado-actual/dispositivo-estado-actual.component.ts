import { formatDate } from "@angular/common";
import { Component, Input, OnDestroy } from "@angular/core";
import { ILineChartOptions } from "chartist";
import { ChartType } from "ng-chartist";
import { Subscription, timer } from "rxjs";
import { Dispositivo } from "src/app/core/models/dispositivo.model";
import { Medicion } from "src/app/core/models/medicion.model";
import { UnidadMedida } from "src/app/core/models/unidadmedida.model";
import { MedicionService } from "src/app/core/services/medicion.service";
import { UnidadMedidaService } from "src/app/core/services/unidadmedida.service";

export interface LiveData {
  labels: string[];
  series: number[][];
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

@Component({
  selector: 'dispositivo-estado-actual',
  templateUrl: './dispositivo-estado-actual.component.html',
  styleUrls: ['./dispositivo-estado-actual.component.css']
})

export class DispositivoEstadoActualComponent implements OnDestroy {
  public data: LiveData;
  public type: ChartType;
  public options :ILineChartOptions;

  mediciones:Medicion[]=[];
  serie:number[][]=[[]];
  unidadadesMedidas: UnidadMedida[] =[];
  private timerSubscription: Subscription;
  @Input() dispositivoID!: string;
  @Input() unidadMedida!: UnidadMedida;
  constructor(public medicionService : MedicionService) {

    this.data = {
      labels: [],
      series: [[]],
    };
    this.type = "Line";
    this.options ={
      showArea:true,
    }

    this.timerSubscription = timer(0, 10000).subscribe(() => this.updateData());
  }

  public updateData() {
    const time: Date = new Date();
    const formattedTime = formatDate(time, "HH:mm:ss", "en");

   this.medicionService.UltimaMedicionDispositivo(this.dispositivoID,this.unidadMedida.id).toPromise().then((response: any) => {
    this.data.labels.push(formattedTime);
    this.data.series[0].push(response[0].valor);

    //Me quedo con los ultimos 10 registros
      this.data.labels =this.data.labels.slice(-9);
      this.data.series[0] = this.data.series[0].slice(-9);

      this.data = { ...this.data };
  }).catch(error => {
    console.log('Error al obtener los campos:' + error);
  });




  }

  public ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}
