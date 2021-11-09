import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EstadisticasReqObject } from '../models/estadisticas-req-object.model';

@Injectable({
    providedIn: 'root'
})
export class EstadisticasService {
    private httpOptions: any;

    private basePath = environment.base_url;

    constructor(private http: HttpClient) {
        //Http Headers Options
        this.httpOptions = {
            headers : new HttpHeaders(
                {'Content-Type': 'application/json'}
            )
        }
    }

    MedicionesPromedioBar(estadisticasReqObject :EstadisticasReqObject) {
      return this.http.post(this.basePath + '/Estadisticas/MedicionesPromedio/bar',estadisticasReqObject, this.httpOptions);
    }

}
