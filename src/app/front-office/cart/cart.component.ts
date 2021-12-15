import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/auth.service';
import { CartService } from 'src/app/core/cart.service';
var _ = require('lodash');

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
currentUser:any
cartItems:any
faTrashAlt=faTrashAlt
total:number=0;
productQuantities:number[]=[]
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
       this.cartItems.forEach((item:any) => {
         this.total+=parseInt(item.prixUnitaire)
       });

        console.log(  "carts",  this.cartItems)
        this.cartItems = _.uniq(data, 'user'); 
        this.cartItems.map((element:any) => {
          element.quantity=1
        });
        
      }
    )
  }

  getCurrentUser(){
this.currentUser=this.authService.getCurrentUser()
console.log(this.currentUser)
  }

  incrementTotal(index:number,produit:any){
    this.total=0
    this.cartItems.forEach((item:any) => {
      
      this.total+=parseInt(item.prixUnitaire)*item.quantity
    });
  }

  goToCheckout(){
    let detailFacture:any[]=[]
    let facture:any
    this.cartItems.forEach((item:any) => {
      detailFacture.push({product:{
        libelle:item.libelle,
        code: item.code,
      prixUnitaire:item.prixUnitaire,
      },quantity:item.quantity,price:item.prixUnitaire})
    });
    facture.detailFacture=detailFacture
    facture.total=this.total
    
    console.log("detailfacture",detailFacture)
    console.log("total",this.total)

  }

}
