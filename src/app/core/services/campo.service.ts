import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Campo } from '../models/campo.model';
import { environment } from 'src/environments/environment';
import { OrderBy, Query, OperatorType } from 'ngx-odata-v4';

@Injectable({
    providedIn: 'root'
})
export class CampoService {
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

    CampoList(ProductorId: string) {

      const query = Query.create().expand('Localidades', l => l.expand('Provincias'))
                                  .expand('Silobolsas')
                                  .filter('productoresID', OperatorType.Eq, `${ProductorId}`);

      return this.http.get(this.basePathOdata + '/Campos' + `?${query.compile()}`, this.httpOptions);

      //return this.http.get(this.basePathOdata + 'Campos?%24expand=Localidades(%24expand=Provincias)&%24filter=ProductoresID%20eq%20' + ProductorId , this.httpOptions);

    }


    add(campo: Campo) {
      return this.http.post(this.basePath + 'Campos', campo, this.httpOptions);
    }

    edit(campo: Campo) {
      return this.http.put(this.basePath + 'Campos/' + campo.ID, campo, this.httpOptions);
    }

    delete(campo: Campo) {
        return this.http.delete(this.basePath+ 'Campos/' + campo.ID, this.httpOptions);
    }
}
