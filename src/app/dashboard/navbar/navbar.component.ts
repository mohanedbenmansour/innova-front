import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/core/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  goToProducts() {
    this.router.navigateByUrl("/dashboard/products")
  }

  goToRayon() {
    this.router.navigateByUrl("/dashboard/rayons")
  }

  goToClient() {
    this.router.navigateByUrl("/dashboard/clients")
  }

  gotToStock() {
    this.router.navigateByUrl("/dashboard/stocks")
  }
  gotToFacture() {
    this.router.navigateByUrl("/dashboard/factures")
  }
  goToReclamation(){
    this.router.navigateByUrl("/dashboard/reclamation")

  }

  logout() {
    this.tokenStorage.signOut()
    this.router.navigateByUrl("/login")
  }
}
