import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order, CreateOrderRequest } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) { }

  createOrder(data: CreateOrderRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  getUserOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my-orders`);
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAllOrders(status?: string): Observable<any> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get(`${this.apiUrl}`, { params });
  }

  updateOrderStatus(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, data);
  }

  cancelOrder(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/cancel`, {});
  }
}
