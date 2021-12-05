import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/core/stock.service';
import { Stock } from 'src/app/model/stock';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {


  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.getStocks();
  }  

  public stocks!: Stock[];
  
  public getStocks(): void {
    this.stockService.getStock().subscribe(
      (Response: Stock[]) => {
        this.stocks = Response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
