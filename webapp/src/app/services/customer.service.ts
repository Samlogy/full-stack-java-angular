import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

// const BASE_URL = 'http://localhost:8080/api/v1/product';
const BASE_URL = '/api/v1/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  get(): Observable<Customer> {
    return this.http.get<Customer>(`${BASE_URL}`);
  }
}
