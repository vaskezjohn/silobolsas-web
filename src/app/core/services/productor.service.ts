import { Injectable } from '@angular/core';
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
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    }
  }

  ProductorList(): any {
    return this.http.get(this.basePathOdata + 'Productores?%24expand=localidades($expand=provincias)', this.httpOptions);
  }

  add(productor: Productor) {
    return this.http.post(this.basePath + 'Productores', productor, this.httpOptions);
  }

  edit(id: string, obj: Productor) {
    return this.http.put(this.basePath + `Productores/${id}`, obj, this.httpOptions);
  }

  delete(id: string) {
    return this.http.delete(this.basePath + `Productores/${id}`, this.httpOptions);
  }

  getByID(id: string) {
    return this.http.get(this.basePath + `Productores/${id}`, this.httpOptions);
  }
}
