
import { formatDate } from "@angular/common";
import { Component, OnDestroy,Input } from "@angular/core";
import { ChartEvent, ChartType } from "ng-chartist";
import { Subscription, timer } from "rxjs";
import {IBarChartOptions,IChartistAnimationOptions,IChartistData} from 'chartist';
import { StorageService } from "src/app/core/authentication/services/storage.service";
import { Medicion } from "src/app/core/models/medicion.model";
import { MedicionService } from "src/app/core/services/medicion.service";

export interface LiveData {
  labels: string[];
  series: number[][];
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

@Component({
  selector: 'silobolsa-estado-actual',
  templateUrl: './silobolsa-estado-actual.component.html',
  styleUrls: ['./silobolsa-estado-actual.component.css']
})

export class SilobolsaEstadoActualComponent implements OnDestroy {
  @Input() silobolsaID!: string;
  mediciones: Medicion[] =[];

  public data: LiveData;
  public type: ChartType;
  //public events: ChartEvent;
  public options: IBarChartOptions;

 // public events: ChartEvent;

  private timerSubscription: Subscription;

  constructor(public MedicionService: MedicionService , public storageService: StorageService  ) {
    this.data = {
      labels: [],
      series: [[]],
    };
    this.type = "Line";

    this.options = {
      axisX: {
        showGrid: false
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


    this.timerSubscription = timer(0, 50000).subscribe(() => this.updateData());
  }


  ngOnInit(): void {

  }

  updateData() {
    const time: Date = new Date();
    const formattedTime = formatDate(time, "HH:mm:ss", "en");
    const random = getRandomInt(1, 40);
    const random1 = getRandomInt(1, 80);
    const random2 = getRandomInt(20, 60);
    const data = this.data.series[0];
    const labels = this.data.labels;



    labels.push(formattedTime);
    this.data.labels = labels.slice(-9);
    data.push(random)
    this.data.series[0] = data.slice(-9);
    data.push(random1)
    this.data.series[1] = data.slice(-9);
    data.push(random2)
    this.data.series[2] = data.slice(-9);

    this.data = { ...this.data };
  }

  public ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
