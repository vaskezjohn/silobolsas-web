import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Granos } from '../models/granos.model';

@Injectable({
    providedIn: 'root'
})
export class GranosService {
    private httpOptions: any;
    private granosOdataUrl = environment.odata_base_url + 'Granos';
    private granosUrl = environment.base_url + 'Granos';

    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders(
                { 'Content-Type': 'application/json' }
            )
        }
    }

    GranosList() {
        return this.http.get(this.granosOdataUrl, this.httpOptions);
    }

    AddGranos(obj: Granos) {
        return this.http.post(this.granosUrl, obj, this.httpOptions);
    }

    DeleteGranos(id: string) {
        return this.http.delete(this.granosUrl + `/${id}`, this.httpOptions);
    }

    UpdateGranos(id: string, obj: Granos) {
        return this.http.put(this.granosUrl + `/${id}`, obj, this.httpOptions);
    }


}
