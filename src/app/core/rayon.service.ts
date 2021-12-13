import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const { api } = environment;
@Injectable({
  providedIn: 'root'
})
export class RayonService {
  constructor(private http: HttpClient) { }

  addRayon(rayon: any) {

    return this.http.post<any>(`${api}/rayons/`, rayon);
  }
  updateRayon(rayon:any,rayonId: any) {
    return this.http.put<any>(`${api}/rayons/${rayonId}`,rayon);
  }
  deleteRayon(rayonId: string) {

    return this.http.delete<any>(`${api}/rayons/${rayonId}`);
  }
  getRayons() {

    return this.http.get<any>(`${api}/rayons`);
  }
}
