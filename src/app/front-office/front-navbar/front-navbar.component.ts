import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faShoppingCart, faAnchor, faAngleDoubleLeft, faPlusCircle, faArrowCircleLeft, faUsers, faTrashAlt, faPen, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-front-navbar',
  templateUrl: './front-navbar.component.html',
  styleUrls: ['./front-navbar.component.css']
})
export class FrontNavbarComponent implements OnInit {
  faShoppingCart=faShoppingCart
  constructor(private router:Router,
    private dialog: MatDialog,

    ) { }

  ngOnInit(): void {
  }
  goToShop() {
    this.router.navigateByUrl("/front-office/shop")
  }
  openPopUpCart(){
    const dialogRef = this.dialog.open(CartComponent,
      {
        width: '80%',
        height: '60%',

      });
    dialogRef.disableClose = false;
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res)
        return
     
    });
  }
}