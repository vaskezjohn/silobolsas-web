import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderBy, Query, OperatorType } from 'ngx-odata-v4';
import { Silobolsa } from '../models/silobolsa.model';


@Injectable({
  providedIn: 'root'
})
export class SilobolsaService {
  private httpOptions: any;
  private silobolsasOdataPath = environment.odata_base_url + 'Silobolsas';
  private silobolsasPath = environment.base_url + 'Silobolsas';
  private camposPath = environment.odata_base_url + 'Campos';

  constructor(private http: HttpClient) {
    //Http Headers Options
    this.httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    }
  }

  SilobolsasList(productoresID: string) {
    const query = Query.create().filter('Campos/productoresID', OperatorType.Eq, `${productoresID}`).expand('Campos');

    return this.http.get(this.silobolsasOdataPath + `?${query.compile()}`, this.httpOptions);
  }

  CamposList(productoresID: string) {
    const query = Query.create().filter('productoresID', OperatorType.Eq, `${productoresID}`);

    return this.http.get(this.camposPath + `?${query.compile()}`, this.httpOptions);
  }

  AddSilobolsa(obj: Silobolsa) {
    return this.http.post(this.silobolsasPath, obj, this.httpOptions);
  }

  DeleteSilobolsa(id: string) {
    return this.http.delete(this.silobolsasPath + `/${id}`, this.httpOptions);
  }

  UpdateSilobolsa(id: string,obj: Silobolsa) {
    return this.http.put(this.silobolsasPath + `/${id}`,obj, this.httpOptions);
  }


}
