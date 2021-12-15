import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/auth.service';
import { CartService } from 'src/app/core/cart.service';
import {FactureService} from "../../core/facture.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
var _ = require('lodash');

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
currentUser:any
cartItems:any[]=[]
faTrashAlt=faTrashAlt
total:number=0;
productQuantities:number[]=[]
  constructor(private dialogRef: MatDialogRef<CartComponent>,private _snackBar: MatSnackBar,private cartService:CartService,private authService:AuthService,private factureService:FactureService) { }

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

  ranCode(length:any) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }


  goToCheckout(){

    let detailFacture:any[]=[]
    let facture:any={}
    this.cartItems.forEach((item:any) => {
      detailFacture.push({produit:{
        libelle:item.libelle,
        code: item.code,
      },qte:item.quantity,prix:item.prixUnitaire})
    });
    facture.detailFactures=detailFacture
    facture.montantFacture=this.total
    facture.client=this.currentUser
    facture.code=this.ranCode(6);
    facture.active=true
    facture.dateFacture=new Date()
 this.cartItems.forEach((item:any) => {
         this.cartService.deleteCart(item.id).subscribe(
           (data)=>{
             console.log(data)
           }
         )
       });
    this.factureService.addFacture(facture).subscribe(
      (date)=>{
        this.openSnackBar("Your checkout has been submitted", 'success')
        this.dialogRef.close();
      }
    )
    console.log("detailfacture",detailFacture)
    console.log("total",this.total)

  }

  removeCart(cart:any){
    this.total-=cart.prixUnitaire*cart.quantity
this.cartService.deleteCart(cart.id).subscribe(
  (data)=>{
    this.getCartItems()
  }
)
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
