import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SilobolsaService {
  private httpOptions: any;
  private basePath  = environment.odata_base_url + 'Silobolsas';

  constructor(private http: HttpClient) {
      //Http Headers Options
      this.httpOptions = {
          headers : new HttpHeaders(
              {'Content-Type': 'application/json'}
          )
      }
  }

  SilobolsasList() {
      return this.http.get(this.basePath, this.httpOptions);
  }
}
