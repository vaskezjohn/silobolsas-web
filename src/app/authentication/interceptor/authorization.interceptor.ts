import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { HttpHandler, HttpRequest, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

    constructor(private storageService: StorageService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let request = req;
    
        if (this.storageService.isAuthenticated()) {
          request = req.clone({
            setHeaders: {
              authorization: `Bearer ${ this.storageService.getCurrentToken() }`
            }
          });
        }
    
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
      
              if (err.status === 401) {
                this.router.navigateByUrl('/login');
              }
      
              return throwError( err );
      
            })
          );
    }
}