import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const { api } = environment;
@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  constructor(private http: HttpClient) { }

  addReclamation(reclamation: any) {

    return this.http.post<any>(`${api}/reclamations/`, reclamation);
  }
  deleteReclamation(reclamationId: string) {

    return this.http.delete<any>(`${api}/reclamations/${reclamationId}`);
  }
  getReclamation() {

    return this.http.get<any>(`${api}/reclamations`);
  }

}
