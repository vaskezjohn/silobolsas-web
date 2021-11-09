import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

    MedicionesPromedio(productorId :string) {
      return this.http.get(this.basePath + '/Estadisticas', this.httpOptions);
    }

}
