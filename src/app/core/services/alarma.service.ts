import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Alarma } from '../models/alarma.model';
import { environment } from 'src/environments/environment';
import { OrderBy, Query, OperatorType } from 'ngx-odata-v4';

@Injectable({
  providedIn: 'root'
})
export class AlarmaService {
  private httpOptions: any;

  private basePath = environment.base_url;
  private basePathOdata = environment.odata_base_url + 'Alarmas';

  constructor(private http: HttpClient) {
    //Http Headers Options
    this.httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    }
  }

  alarmaList(productoresID: string) {
    const query = Query.create().filter('productoresID', OperatorType.Eq, `${productoresID}`)
                                .expand("granos",g => g.select('id','descripcion'))
                                .expand("unidadesMedidas")

    return this.http.get(this.basePathOdata + `?${query.compile()}`, this.httpOptions);
  }

  alarmaListExtendido(productoresID: string) {
    const query = Query.create().filter('productoresID', OperatorType.Eq, `${productoresID}`)
                                .expand("granos",g => g.select('id','descripcion'))
                                .expand("unidadesMedidas")
                                .expand("colores", c => c.select('descripcion','hex'))
                                .expand("tiposNotificaciones", n => n.select('descripcion'))
                                .expand("usuarioDestino", u => u.select('usuario'))

    return this.http.get(this.basePathOdata + `?${query.compile()}`, this.httpOptions);
  }



  add(alarma: Alarma) {
    return this.http.post(this.basePath + 'Alarmas', alarma, this.httpOptions);
  }

  delete(id: string) {
    return this.http.delete(this.basePath + `Alarmas/${id}`, this.httpOptions);
  }

  edit(id: string, obj: Alarma) {
    return this.http.put(this.basePath + `Alarmas/${id}`, obj, this.httpOptions);
  }
}
