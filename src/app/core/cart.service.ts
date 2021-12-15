import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const { api } = environment;
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addCart(cart: any) {
    return this.http.post<any>(`${api}/carts/`, cart);
  }
  updateCart(cart: any, id_cart: any) {
    return this.http.put<any>(`${api}/carts/${id_cart}`, cart);
  }
  deleteCart(id_cart: string) {
    return this.http.delete<any>(`${api}/carts/${id_cart}`);
  }
  getCarts() {
    return this.http.get<any>(`${api}/carts`);
  }
 
}
