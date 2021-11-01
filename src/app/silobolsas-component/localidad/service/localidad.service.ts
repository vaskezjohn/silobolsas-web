import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LocalidadService {
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

    LocalidadList(provinciaId: number) {
      return this.http.get(this.basePathOdata + 'Localidades', this.httpOptions);
    }

}
