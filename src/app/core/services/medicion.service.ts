import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderBy, Query, OperatorType } from 'ngx-odata-v4';

@Injectable({
    providedIn: 'root'
})
export class MedicionService {
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

    MedicionList(productoresID: string) {
      //const query = Query.create().expand('unidadesMedidas')
      //                            .expand('Silobolsas', s => s.expand('Campos'));

      const query = Query.create().expand('UnidadesMedidas')
                                  .expand('Silobolsas', s => s.expand('Campos', c => c.filter('productoresID', OperatorType.Eq, `${productoresID}`)))
                                  .orderBy('fechaHora', OrderBy.Desc);

      return this.http.get(this.basePathOdata + '/Mediciones' + `?${query.compile()}`, this.httpOptions);

    }

    UltimaMedicionList(dispositivoID: string, unidadesMedidasID: string) {
      //const query = Query.create().expand('unidadesMedidas')
      //                            .expand('Silobolsas', s => s.expand('Campos'));

      const query = Query.create().expand('UnidadesMedidas').filter('dispositivosID', OperatorType.Eq, `${dispositivoID}`)
                                                            .filter('unidadesMedidasID', OperatorType.Eq, `${unidadesMedidasID}`)
                                  .orderBy('fechaHora', OrderBy.Desc);

      return this.http.get(this.basePathOdata + '/Mediciones' + `?${query.compile()}`, this.httpOptions);

    }

}
