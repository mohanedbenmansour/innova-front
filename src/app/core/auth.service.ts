import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientService } from './client.service';

const { api } = environment;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  clientList: any = [];
  constructor(
    private http: HttpClient,
    private clientService: ClientService
  ) { }

  login(nom: string, password: string): Observable<any> {
    let users = this.clientService.getClients();
    console.log(users, 'users')
    return users;
  }

  register(nom: string, prenom: string, email: string, date_naissance: string, profession: string, password: string): Observable<any> {
    return this.http.post(`${api}/clients/`, {
      nom,
      prenom,
      email,
      date_naissance,
      profession,
      password,
      categorie_client: 'FIDELE',
      role: "USER",
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    }, httpOptions);
  }

  
}