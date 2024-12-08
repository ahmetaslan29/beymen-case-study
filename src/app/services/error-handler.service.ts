import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  errorHandler(err:HttpErrorResponse) {
    if (err.status === 503) {
      console.error('API kullanılamıyor (503 Service Unavailable).');
    } else if (err.status === 404) {
      console.error('API bulunamadı (404 Not Found).');
    } else if (err.status === 0) {
      console.error('Ağ hatası veya API’ye ulaşılamıyor.');
    } else {
      console.error(err);
    }
  }

}
