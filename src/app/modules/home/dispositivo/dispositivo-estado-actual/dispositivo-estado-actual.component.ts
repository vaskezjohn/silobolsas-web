
import { formatDate } from "@angular/common";
import { Component, OnDestroy,Input, OnInit } from "@angular/core";
import { ChartEvent, ChartType } from "ng-chartist";
import { Subscription, timer } from "rxjs";
import {IBarChartOptions,IChartistAnimationOptions,IChartistData} from 'chartist';
import { StorageService } from "src/app/core/authentication/services/storage.service";
import { MedicionService } from "src/app/core/services/medicion.service";
import { UnidadMedida } from "src/app/core/models/unidadmedida.model";
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

export class DispositivoEstadoActualComponent implements OnInit,OnDestroy {
  @Input() dispositivoID!: string;

  public valoresTemperatura:number[]=[];
  public valoresHumedad:number[]=[];
  public valoresDioxido:number[]=[];
  public series!: number[][];

  public unidadmedidas: UnidadMedida[]=[];
  public valorActual:number[]=[];

  public data: LiveData;
  public type: ChartType;
  //public events: ChartEvent;
  public options: IBarChartOptions;

 // public events: ChartEvent;

  private timerSubscription: Subscription;

  constructor(public MedicionService: MedicionService ,
              public storageService: StorageService,
              public UnidadMedidaService: UnidadMedidaService  ) {
    this.data = {
      labels: [],
      series: [[]],
    };
    this.type = "Line";

    this.options = {
      axisX: {
        showGrid: true,
        showLabel: true,
      },
      axisY:{
        showLabel: true,
        showGrid: true,
      },
      height: 300
    };

    /*this.events = {
      draw: (this.data) => {
        if (this.data.type === 'bar') {
          this.data.element.animate({
            y2: <IChartistAnimationOptions>{
              dur: '0.9s',
              from: this.data.y1,
              to: this.data.y2,
              easing: 'easeOutQuad'
            }
          });
        }
      }
    };*/


    this.timerSubscription = timer(0, 10000).subscribe(() => this.updateData());

  }


  ngOnInit(): void {
    this.updateData();

  }

  updateData() {
    const time: Date = new Date();
    const formattedTime = formatDate(time, "HH:mm:ss", "en");
    const data = this.data.series[0];
    const labels = this.data.labels;
    const temperaturaId ='525c1f84-3ea7-11ec-b9b8-883882e3ecf6';
    const humedadId ='5d46ff54-3ea7-11ec-b9b8-883882e3ecf6';
    const dioxidoId = '75daa939-3ea7-11ec-b9b8-883882e3ecf6';


    /*
    let i:number=0;

    this.UnidadMedidaService.UnidadMedidaList().toPromise().then((respose: any) => {
      respose.forEach((item: any) => {
        this.MedicionService.UltimaMedicionDispositivo(this.dispositivoID,item.id).toPromise().then((respose: any) => {
          respose.forEach((item: any) => {
            this.series[i].push(item.valor);
            i++;
          });
        }).catch(error => {
          console.log('Error al ultimo valor de la medicion');
        });
      });
    }).catch(error => {
      console.log('Error al ultimo valor de la medicion');
    });

    // Me quedo solo con los ultimos 10 valores


    this.data.series[0] = this.series[0];
    this.data.series[1] = this.series[1];
    this.data.series[2] = this.series[2];
    if (this.data.series[0].length > 0){
      this.data.labels.push(formattedTime);
    }
    this.data.labels = labels.slice(-9);
    this.data = { ...this.data };
*/

    this.MedicionService.UltimaMedicionDispositivo(this.dispositivoID,temperaturaId).toPromise().then((respose: any) => {
      respose.forEach((item: any) => {
        this.valoresTemperatura.push(item.valor);
      });
    }).catch(error => {
      console.log('Error al ultimo valor de la medicion');
    });


    this.MedicionService.UltimaMedicionDispositivo(this.dispositivoID,humedadId).toPromise().then((respose: any) => {
      respose.forEach((item: any) => {
        this.valoresHumedad.push(item.valor);
      });
    }).catch(error => {
      console.log('Error al ultimo valor de la medicion');
    });


    this.MedicionService.UltimaMedicionDispositivo(this.dispositivoID,dioxidoId).toPromise().then((respose: any) => {
      respose.forEach((item: any) => {
        this.valoresDioxido.push(item.valor);
      });
    }).catch(error => {
      console.log('Error al ultimo valor de la medicion');
    });



    //this.valoresTemperatura.push(getRandomInt(40, 100));
    //this.valoresHumedad.push(getRandomInt(40, 100));
    //this.valoresDioxido.push(getRandomInt(1, 5));


    // Me quedo solo con los ultimos 10 valores


      this.data.series[0] = this.valoresTemperatura.slice(-9);
      this.data.series[1] = this.valoresHumedad.slice(-9);
      this.data.series[2] = this.valoresDioxido.slice(-9);
      if (this.data.series[0].length > 0){
        this.data.labels.push(formattedTime);
      }
      this.data.labels = labels.slice(-9);
      this.data = { ...this.data };









  }

  public ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
