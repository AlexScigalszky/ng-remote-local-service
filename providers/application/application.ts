import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AplicationProvider {
  public apiUrl: string = 'http://somethis.com/service/api/1/';

  constructor() {
  }

}
