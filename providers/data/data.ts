import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponse } from '../../models/data-response';
import { AplicationProvider } from '../aplication/aplication';
import { catchError, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

// constants
const DATAS_KEY = 'datas';

@Injectable()
export class DataProvider {
  // variables
  url: string;

  constructor(
    public http: HttpClient,
    private storage: Storage,
    private ap: AplicationProvider
  ) {
    this.url = this.ap.apiUrl;
  }

  getAll() {
    return this.http
      .get<DataResponse[]>(`${this.url}/api/Datas`)
      .pipe(
        map((adversidades: DataResponse[]) => {
          this.storage.set(DATAS_KEY, datas).then(res => {
            console.log('datas in localstorage are updated');
          });
          return datas;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(
            'can\'t get data from server, fetching data from localstorage',
            error
          );
          return Observable.fromPromise(
            this.storage.get(DATAS_KEY).then((datas: string) => {
              console.log('datas from storage');
              if (datas === null) {
                return [];
              }
              return datas;
            })
          );
        })
      );
  }
}
