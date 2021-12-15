import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faUser, faAnchor, faAngleDoubleLeft, faPlusCircle, faArrowCircleLeft, faUsers, faTrashAlt, faPen, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/core/product.service';
import { SwalService } from 'src/app/core/swal.service';
import { ProductChartComponent } from '../product-chart/product-chart.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  listUsers: any = [];
  selectedUser: any;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faPlusCircle = faPlusCircle;
  faUsers = faUsers;
  faTrashAlt = faTrashAlt
  faPen = faPen
  faChartLine = faChartLine
  productList: any

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  displayedColumns: string[] = ['#', 'code', 'libelle', 'prixUnitaire', 'actions'];
  dataSource!: MatTableDataSource<any>;

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductListComponent>,
    private ngxLoader: NgxUiLoaderService,
    private swalService: SwalService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.getProductList()
  }

  openDialogCreateProduct() {
    const dialogRef = this.dialog.open(UpdateProductComponent,
      {
        width: '80%',
        height: '60%',

      });
    dialogRef.disableClose = false;
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res)
        return
      this.productList.push(res)
      this.dataSource = new MatTableDataSource<any>(this.productList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getProductList() {
    this.ngxLoader.startLoader('loader');
    this.productService.getProducts().subscribe(
      (products: any) => {

        this.productList = products;
        console.log("+++", this.productList)

        this.dataSource = new MatTableDataSource<any>(this.productList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.ngxLoader.stopLoader('loader');
      }, (error: Error) => {
        console.log('error', error)
        this.toastr.error('Erreur serveur !', '', {
          timeOut: 2000,
          closeButton: true,
        });
        this.ngxLoader.stopLoader('loader');
      });
  }

  openDialogEditProduct(product: any) {
    const dialogRef = this.dialog.open(UpdateProductComponent,
      {
        width: '80%',
        height: '60%',
        data: product
      });

    dialogRef.disableClose = false;
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res)
        return
      let productIndex = this.productList.findIndex((product: any) => {
        return product.id == res.id
      })

      this.productList[productIndex] = res

      this.dataSource = new MatTableDataSource<any>(this.productList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  onDelete(productId: string) {
    this.swalService.confirmAlert(
      'Delete Product',
      'Are you sure you want to delete this product ?',
      'Delete'
    ).then((result: any) => {
      if (result.value) {


        this.productService.deleteProduct(productId).subscribe(
          (data) => {
            this.openSnackBar("product deleted", 'success')

            this.productList = this.productList.filter((product: any) => {
              return product.id != productId
            })
            this.dataSource = new MatTableDataSource<any>(this.productList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

          }, (err) => {
            console.log('error', err)
            this.openSnackBar("server error", 'error')
          }
        )
      }
    })
  }

  openDialogChart() {
    const dialogRef = this.dialog.open(ProductChartComponent,
      {
        width: '80%',
        height: '60%',
        data: this.productList
      });

    dialogRef.disableClose = false;
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res)
        return


    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
