import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
const { api } = environment;
@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http: HttpClient) { }
  addFacture(facture: any) {

    return this.http.post<any>(`${api}/factures/`, facture);
  }
  updateFacture(facture:any,factureId: any) {

    return this.http.put<any>(`${api}/factures/${factureId}`,facture);
  }
  deleteFacture(factureId: string) {

    return this.http.delete<any>(`${api}/factures/${factureId}`);
  }
  getFactures() {

    return this.http.get<any>(`${api}/factures`);
  }
}
