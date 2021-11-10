import { formatDate } from "@angular/common";
import { Component, Input, OnDestroy } from "@angular/core";
import { ChartType } from "ng-chartist";
import { Subscription, timer } from "rxjs";
import { Dispositivo } from "src/app/core/models/dispositivo.model";
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
  serie:number[][]=[[]];
  public unidadadesMedidas: UnidadMedida[] =[];
  private timerSubscription: Subscription;
  @Input() dispositivoID!: string;
  @Input() unidadMedida!: UnidadMedida;
  constructor(public medicionService : MedicionService) {

    this.data = {
      labels: [],
      series: [[]],
    };
    this.type = "Line";

    this.timerSubscription = timer(0, 10000).subscribe(() => this.updateData());
  }

  updateData() {
    const time: Date = new Date();
    const formattedTime = formatDate(time, "HH:mm:ss", "en");
    const random = getRandomInt(1, 40);
    const data = this.data.series[0];
    const labels = this.data.labels;

    labels.push(formattedTime);
    data.push(random);

    /*
    this.medicionService.UltimaMedicionDispositivo(this.dispositivoID,this.unidadMedida.id).toPromise().then((respose: any) => {
      respose.forEach((item: any) => {
        data.push(item.valor);
      });
    });
*/

    // We only want to display 10 data points at a time
    this.data.labels = labels.slice(-9);
    this.data.series[0] = data.slice(-9);

    this.data = { ...this.data };
  }

  public ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}
