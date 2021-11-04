import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Productor } from '../models/productor.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductorService {
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

    ProductorList() {
      return this.http.get(this.basePathOdata + 'Productores?%24expand=localidades($expand=provincias)', this.httpOptions);
    }

   add(productor: Productor) {
      return this.http.post(this.basePath + 'Productores', productor, this.httpOptions);
      //return this.http.post('https://localhost:44362/' + 'Productores', productor, this.httpOptions);

    }
/*
    edit(campo: Productor) {
      campo.productorId = this.productorId;
      return this.http.put(this.basePath + 'Campos/' + campo.id, campo, this.httpOptions);
    }

    delete(campo: Productor) {
        return this.http.delete(this.basePath+ 'Campos/' + campo.id, this.httpOptions);
    } */
}
