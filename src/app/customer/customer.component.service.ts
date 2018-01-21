import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';

@Injectable()
export class CustomerService {

  public router: Router;

  constructor(private _http: Http, router: Router) { }

  //To Get Customers List
  getCustomers(): Observable<any> {
    return this._http.get('http://localhost:3000/api/getCustomers', {})
      .map((response: Response) => response.json());
  }

   //To Save Customer
   saveCustomer(name: string, address: any, phone: string, dob: string, email: string): Observable<any> {
    return this._http.post('http://localhost:3000/api/saveCustomer', {
      "name": name,
      "address": address,
      "phone": phone,
      "dob": dob,
      "email": email
    })
      .map((response: Response) => response.json());
  }

   //To Edit Customer
   editCustomer(id: string, name: string, address: string, phone: string, dob: string, email: string): Observable<any> {
    return this._http.put('http://localhost:3000/api/editCustomer/'+id, {
      "name": name,
      "address": address,
      "phone": phone,
      "dob": dob,
      "email": email
    })
      .map((response: Response) => response.json());
  }

  //To Delete Customer
  deleteCustomer(id: string): Observable<any> {
    return this._http.delete('http://localhost:3000/api/deleteCustomer/' +id, {})
      .map((response: Response) => response.json());
  }

  //To Search Keyword
  searchKeyword(keyword: string): Observable<any> {
    return this._http.get('http://localhost:3000/api/searchKeyword/'+keyword, {})
      .map((response: Response) => response.json());
  }

}
