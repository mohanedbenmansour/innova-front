import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { CartService } from 'src/app/core/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
currentUser:any
cartItems:any
  constructor(private cartService:CartService,private authService:AuthService) { }

  ngOnInit(): void {
    this.getCurrentUser()
    this.getCartItems()
  }

  getCartItems(){
    this.cartService.getCarts().subscribe(
      (data)=>{
        this.cartItems=data
       this.cartItems= this.cartItems.filter((cart:any)=>{
          return cart.client.id==this.currentUser.id
        })
        console.log(  "carts",  this.cartItems)

        
      }
    )
  }

  getCurrentUser(){
this.currentUser=this.authService.getCurrentUser()
console.log(this.currentUser)
  }

}
