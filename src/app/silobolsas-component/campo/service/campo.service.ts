import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Campo } from '../models/campo.model';

@Injectable({
    providedIn: 'root'
})
export class CampoService {
    private httpOptions: any;
    private basePath  = 'https://gendesoft.com/silobolsas-api/';

    constructor(private http: HttpClient) {
        //Http Headers Options
        this.httpOptions = {
            headers : new HttpHeaders(
                {'Content-Type': 'application/json'}
            )
        }
    }

    CampoList() {
      return this.http.get(this.basePath + 'odata/Campos', this.httpOptions);
    }

    add(campo: Campo) {
      return this.http.post(this.basePath + 'Campos', campo, this.httpOptions);
    }

    edit(campo: Campo) {
        return this.http.put(this.basePath + 'Campos/' + campo.id, campo, this.httpOptions);
    }

    delete(campo: Campo) {
        return this.http.delete(this.basePath + 'Campos/' + campo.id, this.httpOptions);
    }
}
