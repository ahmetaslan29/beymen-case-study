import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTable, Total } from '../types';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(
    private _http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getDataTable(callback:(res:any)=> void, params?: { [key: string]: any }) {

    const options = params ? { params: params } : {};
    this._http.get<DataTable[]>('http://localhost:3000/dataTable', options).subscribe({
      next:(res: any) => {
        callback(res)
      },
      error:(res:HttpErrorResponse) => {
        this.errorHandlerService.errorHandler(res)
      }
    })
  }

  getTotal(callback:(res:any)=> void) {
    this._http.get<Total>('http://localhost:3000/total').subscribe({
      next:(res: any) => {
        callback(res)
      },
      error:(res:HttpErrorResponse) => {
        this.errorHandlerService.errorHandler(res)
      }
    })
  }
}
