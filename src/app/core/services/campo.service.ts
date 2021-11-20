import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Campo } from '../models/campo.model';
import { environment } from 'src/environments/environment';
import { OrderBy, Query, OperatorType } from 'ngx-odata-v4';

@Injectable({
  providedIn: 'root'
})
export class CampoService {
  private httpOptions: any;

  private basePath = environment.base_url + 'Campos';
  private basePathOdata = environment.odata_base_url + 'Campos';

  constructor(private http: HttpClient) {
    //Http Headers Options
    this.httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    }
  }

  CampoList(ProductorId: string) {

    const query = Query.create()
      .orderBy('ID', OrderBy.Desc)
      .expand('Localidades', l => l.expand('Provincias'))
      .expand('Silobolsas', s => s.expand('Dispositivos'))
      .filter('productoresID', OperatorType.Eq, `${ProductorId}`);

    return this.http.get(this.basePathOdata + `?${query.compile()}`, this.httpOptions);
  }


  add(campo: Campo) {
    return this.http.post(this.basePath, campo, this.httpOptions);
  }

  edit(campo: Campo) {
    return this.http.put(this.basePath + '/' + campo.ID, campo, this.httpOptions);
  }

  delete(campo: Campo) {
    return this.http.delete(this.basePath + '/' + campo.ID, this.httpOptions);
  }
}
