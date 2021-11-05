import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Dispositivo } from '../models/dispositivo.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DispositivoService {
    private httpOptions: any;

    private basePath = environment.base_url;
    private basePathOdata = environment.odata_base_url;

    constructor(private http: HttpClient) {
        //Http Headers Options
        this.httpOptions = {
            headers : new HttpHeaders(
                {'Content-Type': 'application/json'}
            )
        }
    }

    DispositivoList() {
      return this.http.get(this.basePathOdata + 'Dispositivos?%24expand=silobolsas', this.httpOptions);
    }

  /*  add(productor: Productor) {
      return this.http.post(this.basePath + 'Productores', productor, this.httpOptions);
      //return this.http.post('https://localhost:44362/' + 'Productores', productor, this.httpOptions);

    }

    edit(id: string, obj: Productor) {
      return this.http.put(this.basePath + `Productores/${id}`, obj, this.httpOptions);
    }


    delete(id: string) {
      return this.http.delete(this.basePath + `Productores/${id}`, this.httpOptions);
    } */
}
