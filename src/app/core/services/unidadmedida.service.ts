import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { expand } from 'rxjs-compat/operator/expand';

@Injectable({
    providedIn: 'root'
})
export class UnidadMedidaService {
    private httpOptions: any;

    private basePath = environment.base_url + 'UnidadesMedidas';
    private basePathOdata = environment.odata_base_url + 'UnidadesMedidas';

    constructor(private http: HttpClient) {
        //Http Headers Options
        this.httpOptions = {
            headers : new HttpHeaders(
                {'Content-Type': 'application/json'}
            )
        }
    }

    UnidadMedidaList() {
      return this.http.get(this.basePathOdata, this.httpOptions);
    }

}
