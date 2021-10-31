import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderBy, Query, OperatorType } from 'ngx-odata-v4';


@Injectable({
  providedIn: 'root'
})
export class SilobolsaService {
  private httpOptions: any;
  private silobolsasPath = environment.odata_base_url + 'Silobolsas';

  constructor(private http: HttpClient) {
    //Http Headers Options
    this.httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    }
  }

  SilobolsasList(filterValue: string) {
    const query = Query.create().filter('Campos/productoresID',OperatorType.Eq,`${filterValue}`).expand('Campos');

    return this.http.get(this.silobolsasPath +`?${query.compile()}`, this.httpOptions);
  }
}
