import { Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CampoService {
    private httpOptions: any;
    private basePath  = 'https://gendesoft.com/silobolsas-api/odata/Campos';

    constructor(private http: HttpClient) {
        //Http Headers Options
        this.httpOptions = {
            headers : new HttpHeaders(
                {'Content-Type': 'application/json'}
            )
        }
    }

    CampoList() {
        return this.http.get(this.basePath, this.httpOptions);
    }
}
