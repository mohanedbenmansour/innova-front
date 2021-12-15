import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.css']
})
export class ProductChartComponent implements OnInit {

  products: any
  ngOnInit(): void {
    this.products = this.data
    let number: number[] = [0, 0, 0, 0]
    this.products.forEach((product: any) => {
      switch (product.type) {
        case "tshirt": {
          number[0]++
          break;
        }
        case "hoody": {
          number[1]++
          break;
        }
        case "jacket": {
          number[2]++
          break;
        }


        default: {
          number[3]++
          break;
        }
      }

    });

    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['tshirt', 'hoody', 'jacket', 'tanktop'],
        datasets: [{
          label: 'number of shirts',
          data: number,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data: any
  ) {
  }



}
