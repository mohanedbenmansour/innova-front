import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const { api } = environment;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(product: any) {

    return this.http.post<any>(`${api}/products/`, product);
  }
  updateProduct(product:any,productId: any) {

    return this.http.put<any>(`${api}/products/${productId}`,product);
  }
  deleteProduct(productId: string) {

    return this.http.delete<any>(`${api}/products/${productId}`);
  }
  getProducts() {

    return this.http.get<any>(`${api}/products`);
  }
}
