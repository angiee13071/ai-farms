import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { MD5 } from 'crypto-js';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { environment } from '../../../../environments/environment';

@Injectable()
export class StorageInterceptor implements HttpInterceptor {
  // private db: any;
  constructor(
    private dbService: NgxIndexedDBService
  ) {

    // const DBOpenRequest = window.indexedDB.open("platform", 1);
    // DBOpenRequest.onsuccess = (event) => {
    //   this.db = DBOpenRequest.result;
    //   console.info('DBOpenRequest', event, this.db);
    // };
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let response = this.ResponseStorage(request);
    console.log('Entre');
    if (response) {
      return of(new HttpResponse({ "body": response }));
    }

    const request_clone = request.clone({
      headers: request.headers.delete('AgrodatAi-Storage')
    });

    return next.handle(request_clone).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.SaveResponseStorage(request, event.clone());
        }
      })
    )
  }

  //TODO almacenar en sesionstorage o localstorage, cuando no venga la marca de la peticion de indexeddb
  SaveResponseStorage(request: HttpRequest<unknown>, record: any) {
    let storage = request.headers.get('AgrodatAi-Storage');
    let request_body = JSON.stringify(request.body);
    let key = MD5(request_body).toString();
    let response_body = {
      id: key,
      create_date: Date.now(),
      expires_in: new Date(Date.now() + (1000 * environment.expires_cache)).getTime(),
      request: request_body,
      body: JSON.stringify(record.body)
    };
    // TODO agregar la validacion de opciones de almacenamiento en el navegador
    if (storage) {
      // console.log('SaveResponseStorage', request.url, record, request.headers.get('AgrodatAi-Storage'));
      // TODO encriptar la inforamcion con un metodo que nos permita acceder a ella
      this.dbService.count('request', key).subscribe((peopleCount) => {
        // console.log('key count', key, peopleCount, Date.now());
        if (peopleCount < 1) {
          this.dbService.add('request', response_body).subscribe((key) => {
            // console.log('SaveResponseStorage - key: ', key);
          });
        }
      });

    } else {
      localStorage.setItem(key, JSON.stringify(response_body));
    }
  }

  ResponseStorage(request: HttpRequest<unknown>) {
    let key = MD5(JSON.stringify(request.body)).toString();
    let data: any = localStorage.getItem(key);
    if (data) {
      data = JSON.parse(data);
      if (data.expires_in > Date.now()) {
        return JSON.parse(data.body);
      } else {
        localStorage.removeItem(key);
      }
    }
    return null
  }

}
