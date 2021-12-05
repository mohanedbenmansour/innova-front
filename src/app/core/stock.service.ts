import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stock } from '../model/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getStock(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiServerUrl}/api/stock/getAllStocks`);
  }

  public addgetStock(stock: Stock): Observable<Stock[]> {
    return this.http.post<Stock[]>(`${this.apiServerUrl}/api/stock/addStock`,stock);
  }

  public updateStock(stock: Stock): Observable<Stock[]> {
    return this.http.put<Stock[]>(`${this.apiServerUrl}/api/stock/modify-stock`,stock);
  }
  
  public deleteStock(stockId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/stock/deleteStock/${stockId}`);
  }
}
