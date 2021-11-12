import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ColorService {
    private httpOptions: any;

    private basePath = environment.base_url + 'Colores';
    private basePathOdata = environment.odata_base_url + 'Colores';

    constructor(private http: HttpClient) {
        //Http Headers Options
        this.httpOptions = {
            headers : new HttpHeaders(
                {'Content-Type': 'application/json'}
            )
        }
    }

    ColorList() {
      return this.http.get(this.basePathOdata, this.httpOptions);
    }

}
