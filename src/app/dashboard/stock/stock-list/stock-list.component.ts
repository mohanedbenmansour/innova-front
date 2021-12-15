import { Component, Inject, OnInit, ViewChild , ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RayonService } from 'src/app/core/rayon.service';
import { faUser, faAnchor, faAngleDoubleLeft, faPlusCircle, faArrowCircleLeft,faUsers,faTrashAlt, faPen,faChartLine, faAlignCenter, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SwalService } from 'src/app/core/swal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StockService } from 'src/app/core/stock.service';
import { UpdateStockComponent } from '../update-stock/update-stock.component';
import jsPDF, { jsPDFAPI } from 'jspdf';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  faAngleDoubleLeft = faAngleDoubleLeft;
  faPlusCircle = faPlusCircle;
  faUsers = faUsers;
  faTrashAlt=faTrashAlt
  faPen=faPen
  faChartLine=faChartLine
  faAlignCenter=faAlignCenter
  faFilePdf=faFilePdf

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator ;
  @ViewChild(MatSort, { static: true }) sort!: MatSort ;

  displayedColumns: string[] = ['#','libelleStock','qte','qteMin','actions'];
  dataSource!: MatTableDataSource<any> ;

  @ViewChild('content', {static: false}) el!: ElementRef;

  stockList: any
  libelleStock: any
  constructor(private  stockService: StockService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<StockListComponent>,
    private ngxLoader: NgxUiLoaderService,
    private swalService: SwalService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any) { }
  ngOnInit(): void {
    this.getStocks();
  }

  getStocks() {
    this.stockService.getStocks().subscribe(
      (data) => {
        console.log("data", data)
        this.stockList = data;

        this.dataSource = new MatTableDataSource<any>(this.stockList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err)

      }
    )
  }

  openDialogCreateStock(){
    const dialogRef = this.dialog.open(UpdateStockComponent,
      {
        width: '80%',
        height: '60%',

      });

    dialogRef.disableClose = false;
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res)
        return
      this.stockList.push(res)

      this.dataSource = new MatTableDataSource<any>(this.stockList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  deleteStock(stockId: string) {
    this.stockService.deleteStock(stockId).subscribe(
      (data) => {
        this.stockList = this.stockList.filter((rayon: any) => {
          return rayon.id != stockId
        })

        this.dataSource = new MatTableDataSource<any>(this.stockList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {

      }
    )
  }

  openDialogEditStock(element: any, index: number){
    const dialogRef = this.dialog.open(UpdateStockComponent,
      {
        width: '80%',
        height: '60%',
        data: element
      });

    dialogRef.disableClose = false;
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res)
        return
      this.stockList[index] = res
      this.dataSource = new MatTableDataSource<any>(this.stockList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  makePDF(){
    let pdf = new jsPDF('p','pt','a4');
    pdf.html(this.el.nativeElement,{
      callback: (pdf)=> {
        pdf.save("stocks.pdf");
      }
    });
  }



   searchStock(key: any) {
    console.log(key);
    const results: any[] = [];
    for (const s of this.stockList) {
      if (s.libelleStock.toLowerCase().indexOf(key.toLowerCase()) !== -1) 
      {
        results.push(s);
      }
    }
    this.stockList = results;
    console.log(this.stockList);

    this.dataSource = new MatTableDataSource<any>(this.stockList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if ( !key) {
      this.getStocks();
    }
  }
    

}
