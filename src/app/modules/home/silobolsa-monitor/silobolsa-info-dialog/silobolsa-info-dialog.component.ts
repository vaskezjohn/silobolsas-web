import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dispositivo } from 'src/app/core/models/dispositivo.model';
import { UnidadMedida } from 'src/app/core/models/unidadmedida.model';
import { DispositivoService } from 'src/app/core/services/dispositivo.service';
import { UnidadMedidaService } from 'src/app/core/services/unidadmedida.service';

@Component({
  selector: 'app-silobolsa-info-dialog',
  templateUrl: './silobolsa-info-dialog.component.html',
  styleUrls: ['./silobolsa-info-dialog.component.css']
})
export class SilobolsaInfoDialogComponent implements OnInit {
  ultimasMediciones!: any;

  temperaturaColor!: string;
  temperaturaSimbolo!: string;
  temperatura!: string;

  humedadColor!: string;
  humedadSimbolo!: string;
  humedad!: string;

  co2Color!: string;
  co2Simbolo!: string;
  co2!: string;

  unidadesMedidas: UnidadMedida[] = [];

  constructor(
    public dispositivoService: DispositivoService,
    public unidadMedidaService: UnidadMedidaService,
    @Inject(MAT_DIALOG_DATA) public dispositivo: Dispositivo) { }

  ngOnInit(): void {
    if (this.dispositivo.ID) {
      this.dispositivoService.DispositivoListByID(this.dispositivo.ID).toPromise().then((respose: any) => {
        console.log("open",respose);
        respose.ultimasMediciones.forEach((item: any) => {

          if (item.unidadesMedidas.id == '525c1f84-3ea7-11ec-b9b8-883882e3ecf6') {
            this.temperatura = item.valor;
            this.temperaturaColor = item.colores.hex;
            this.temperaturaSimbolo = item.unidadesMedidas.simbolo;
          }
          else if (item.unidadesMedidas.id == '5d46ff54-3ea7-11ec-b9b8-883882e3ecf6') {
            this.humedad = item.valor;
            this.humedadColor = item.colores.hex;
            this.humedadSimbolo = item.unidadesMedidas.simbolo;
          }
          else if (item.unidadesMedidas.id == '75daa939-3ea7-11ec-b9b8-883882e3ecf6') {
            this.co2 = item.valor;
            this.co2Color = item.colores.hex;
            this.co2Simbolo = item.unidadesMedidas.simbolo;
          }
        });

        this.unidadMedidaService.UnidadMedidaList().toPromise().then((response: any) => {
          response.forEach((item: any) => this.unidadesMedidas.push(new UnidadMedida(item.id, item.descripcion, item.simbolo)));
        }).catch(error => {
          console.log('Error al obtener las unidades de medida');
        });

      }).catch(error => {
        console.log('dispositivo invalida');
      });
    }

  }


}


