import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const { api } = environment;
@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: HttpClient) { }

  addStock(stock: any) {

    return this.http.post<any>(`${api}/stocks/`, stock);
  }
  updateStock(stock:any,stockId: any) {

    return this.http.put<any>(`${api}/stocks/${stockId}`,stock);
  }
  deleteStock(stockId: string) {

    return this.http.delete<any>(`${api}/stocks/${stockId}`);
  }
  getStocks() {

    return this.http.get<any>(`${api}/stocks`);
  }
}
