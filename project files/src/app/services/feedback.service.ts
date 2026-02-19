import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateFeedbackRequest } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = `${environment.apiUrl}/feedback`;

  constructor(private http: HttpClient) { }

  createFeedback(data: CreateFeedbackRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  getAllFeedbacks(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getProductFeedbacks(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/${productId}`);
  }

  approveFeedback(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/approve`, {});
  }

  deleteFeedback(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
