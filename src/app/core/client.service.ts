import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const { api } = environment;
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  addClient(client: any) {
    return this.http.post<any>(`${api}/clients/`, client);
  }
  updateClient(client: any, id_client: any) {
    return this.http.put<any>(`${api}/clients/${id_client}`, client);
  }
  deleteClient(id_client: string) {
    return this.http.delete<any>(`${api}/clients/${id_client}`);
  }
  getClients() {
    return this.http.get<any>(`${api}/clients`);
  }
}
