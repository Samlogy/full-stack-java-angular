import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

// const BASE_URL = 'http://localhost:8080/api/v1/product';
const BASE_URL = '/api/v1/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(query?: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${BASE_URL}?${query}`);
  }

  get(id: any): Observable<Product> {
    return this.http.get<Product>(`${BASE_URL}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(BASE_URL, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${BASE_URL}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`);
  }
}
