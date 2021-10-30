import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Campo } from '../models/campo.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CampoService {
    private httpOptions: any;

    private basePath = environment.base_url;
    private basePathOdata = environment.odata_base_url;
    private productorId = '08d999ca-09d7-49bf-8c0a-22601330e571';

    constructor(private http: HttpClient) {
        //Http Headers Options
        this.httpOptions = {
            headers : new HttpHeaders(
                {'Content-Type': 'application/json'}
            )
        }
    }

    CampoList() {
      return this.http.get(this.basePathOdata + 'Campos', this.httpOptions);
      //return this.http.get(this.basePath + 'odata/Campos?%24filter=ProductoresID%20eq%20' + this.productorId , this.httpOptions);
    }

    add(campo: Campo) {
      campo.productorId = this.productorId;
      return this.http.post(this.basePath + 'Campos', campo, this.httpOptions);
    }

    edit(campo: Campo) {
      campo.productorId = this.productorId;
      return this.http.put(this.basePath + 'Campos/' + campo.id, campo, this.httpOptions);
    }

    delete(campo: Campo) {
        return this.http.delete(this.basePath+ 'Campos/' + campo.id, this.httpOptions);
    }
}
