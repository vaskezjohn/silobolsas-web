import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Dispositivo } from '../models/dispositivo.model';
import { environment } from 'src/environments/environment';
import { OrderBy, Query, OperatorType } from 'ngx-odata-v4';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  private httpOptions: any;

  private basePath = environment.base_url;
  private basePathOdata = environment.odata_base_url + 'Dispositivos';

  constructor(private http: HttpClient) {
    //Http Headers Options
    this.httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    }
  }

  DispositivoList(productoresID: string) {
    const query = Query.create().filter('Silobolsas/Campos/productoresID', OperatorType.Eq, `${productoresID}`)
      .expand('Silobolsas', c => c.expand('Campos'))
      .orderBy('insertDate', OrderBy.Asc);

    return this.http.get(this.basePathOdata + `?${query.compile()}`, this.httpOptions);
  }

  DispositivoListBySilobolasID(silobolsaID: string) {
    const query = Query.create().filter('silobolsasID', OperatorType.Eq, `${silobolsaID}`);
    return this.http.get(this.basePathOdata + `?${query.compile()}`, this.httpOptions);
    //return this.http.get(this.basePathOdata + '/Dispositivos' + `?${query.compile()}`, this.httpOptions);
  }

  add(dispositivo: Dispositivo) {
    return this.http.post(this.basePath + 'Dispositivos', dispositivo, this.httpOptions);
  }


  edit(id: string, obj: Dispositivo) {
    return this.http.put(this.basePath + `Dispositivos/${id}`, obj, this.httpOptions);
  }

  delete(id: string) {
    return this.http.delete(this.basePath + `Dispositivos/${id}`, this.httpOptions);
  }

  DispositivoListByID(ID: string) {
    const query = Query.create().filter('silobolsasID', OperatorType.Eq, `${ID}`);
    return this.http.post(this.basePath + `Dispositivos/GetEstadoActual`, { dispositivosID: ID }, this.httpOptions);
    //return this.http.get(this.basePathOdata + '/Dispositivos' + `?${query.compile()}`, this.httpOptions);
  }
}
