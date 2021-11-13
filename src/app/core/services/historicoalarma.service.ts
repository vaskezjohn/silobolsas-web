import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderBy, Query, OperatorType } from 'ngx-odata-v4';

@Injectable({
    providedIn: 'root'
})
export class HistoricoAlarmaService {
    private httpOptions: any;

    private basePath = environment.base_url + 'HistoricoAlarmas';
    private basePathOdata = environment.odata_base_url + 'HistoricoAlarmas';

    constructor(private http: HttpClient) {
        //Http Headers Options
        this.httpOptions = {
            headers : new HttpHeaders(
                {'Content-Type': 'application/json'}
            )
        }
    }

    HistoricoAlarmaList(productoresID: string) {
      const query = Query.create().filter('Silobolsas/Campos/productoresID', OperatorType.Eq, `${productoresID}`).expand('Colores')
                                  .expand('Dispositivos')
                                  .expand('TiposNotificaciones')
                                  .expand('UnidadesMedidas')
                                  .expand('Usuarios')
                                  .expand('Silobolsas', s => s.expand('Campos'))
                                  .orderBy('fechaHora', OrderBy.Desc);

      return this.http.get(this.basePathOdata + `?${query.compile()}`, this.httpOptions);

    }

}
