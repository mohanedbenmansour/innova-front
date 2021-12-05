import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToProducts(){
    this.router.navigateByUrl("/dashboard/products")
  }

  goToStock(){
    this.router.navigateByUrl("/dashboard/stock")
  }

  goToRayon(){
    this.router.navigateByUrl("/dashboard/rayon")
  }
}
