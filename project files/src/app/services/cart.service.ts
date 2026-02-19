import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cart, AddToCartRequest } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;
  private cartItemsCount = new BehaviorSubject<number>(0);
  public cartItemsCount$ = this.cartItemsCount.asObservable();

  constructor(private http: HttpClient) { }

  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}`).pipe(
      tap((response: any) => {
        if (response.success) {
          this.updateCartCount(response.cart.items.length);
        }
      })
    );
  }

  addToCart(data: AddToCartRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data).pipe(
      tap((response: any) => {
        if (response.success) {
          this.updateCartCount(response.cart.items.length);
        }
      })
    );
  }

  updateCartItem(data: AddToCartRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, data).pipe(
      tap((response: any) => {
        if (response.success) {
          this.updateCartCount(response.cart.items.length);
        }
      })
    );
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`).pipe(
      tap((response: any) => {
        if (response.success) {
          this.updateCartCount(response.cart.items.length);
        }
      })
    );
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`).pipe(
      tap(() => {
        this.updateCartCount(0);
      })
    );
  }

  updateCartCount(count: number): void {
    this.cartItemsCount.next(count);
  }
}
