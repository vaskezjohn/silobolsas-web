import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GranosService {
    private httpOptions: any;
    private granosOdataUrl = environment.odata_base_url + 'Granos';

    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers : new HttpHeaders(
                {'Content-Type': 'application/json'}
            )
        }
    }

    GranosList() {
        return this.http.get(this.granosOdataUrl, this.httpOptions);
    }

}
