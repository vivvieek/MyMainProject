import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvdataService {

  constructor(private http:HttpClient) { }

  async upload(file:File):Promise<any>{
    const formData= new FormData();
    formData.append('csvFile',file);
    return this.http.post<any>('http://localhost:3000/addcsv',formData).toPromise();
  }
}