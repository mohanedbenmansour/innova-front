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

    return this.http.post<any>(`${api}/product/`, product);
  }
  updateProduct(product:any,productId: any) {

    return this.http.put<any>(`${api}/product/updateProduct/${productId}`,product);
  }
  deleteProduct(productId: string) {

    return this.http.delete<any>(`${api}/product/deleteProduct/${productId}`);
  }
  getProducts() {

    return this.http.get<any>(`${api}/product/getProducts`);
  }
}
