import { formatDate } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ILineChartOptions, roundWithPrecision } from "chartist";
import { ChartType } from "ng-chartist";
import { Subscription, timer } from "rxjs";
import { Medicion } from "src/app/core/models/medicion.model";
import { UnidadMedida } from "src/app/core/models/unidadmedida.model";
import { MedicionService } from "src/app/core/services/medicion.service";

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

export class DispositivoEstadoActualComponent implements OnInit {
  public data: LiveData;
  public type: ChartType;
  public options :ILineChartOptions;

  mediciones:Medicion[]=[];
  serie:number[][]=[[]];
  unidadadesMedidas: UnidadMedida[] =[];
  //private timerSubscription: Subscription;
  @Input() dispositivoID!: string;
  @Input() unidadMedida!: UnidadMedida;
  constructor(public medicionService : MedicionService) {

    this.data = {
      labels: [],
      series: [[]],
    };
    this.type = "Line";
    this.options = {
      showArea:true,
    }

  //  this.timerSubscription = timer(0, 10000).subscribe(() => this.updateData());
  }


  ngOnInit(): void {
    this.updateData();

  }

  public updateData() {
    const time: Date = new Date();
    const formattedTime = formatDate(time, "HH:mm:ss", "en");
    var serie:number[]=[];
    var label:string[]=[];

    this.medicionService.UltimaMedicionDispositivo(this.dispositivoID,this.unidadMedida.id).toPromise().then((respose: any) => {
      respose.forEach((item: any) => {
        serie.push(item.valor);
        label.push(item.fechaHora.substr(11,5));

      });
      this.data.labels = label.reverse();
      this.data.series.push(serie.reverse());

      this.data = { ...this.data };
    }).catch(error => {
      console.log('Error al obtener las mediciones');
    });

  }

  refresh(){


  }

}
 // public ngOnDestroy(): void {
 //   this.timerSubscription.unsubscribe();
 // }
