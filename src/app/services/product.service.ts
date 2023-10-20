import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import {
  ResponseCreatedAndUpdated,
  ProductResponse,
  Product,
  ProductHistoryResponse,
  DeleteResponse,
} from '../types/services/product.types';
@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient, private userService: UserService) {}

  product(id: number) {
    return this.http.get<Product>(`/api/v1/product/${id}`);
  }

  create(data: any) {
    const jwt = this.userService.getJwt();
    return this.http.post<ResponseCreatedAndUpdated>(
      '/api/v1/product/create',
      data,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
  }

  delete(id: number) {
    const jwt = this.userService.getJwt();
    return this.http.post<DeleteResponse>(
      '/api/v1/product/delete',
      { id },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
  }

  update(data: any) {
    const jwt = this.userService.getJwt();
    return this.http.post<ResponseCreatedAndUpdated>(
      '/api/v1/product/update',
      data,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
  }

  list(queryParams: any) {
    return this.http.get<ProductResponse>('/api/v1/product', {
      params: { ...queryParams },
    });
  }

  historyList(queryParams: any) {
    return this.http.get<ProductHistoryResponse>('/api/v1/product/history', {
      params: { ...queryParams },
    });
  }
}
