import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faBuilding, faAnchor, faAngleDoubleLeft, faPlusCircle, faArrowCircleLeft,faUsers,faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/core/product.service';
import { RayonService } from 'src/app/core/rayon.service';
import { StockService } from 'src/app/core/stock.service';
import { SwalService } from 'src/app/core/swal.service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent implements OnInit {

  stockForm!: FormGroup ;
  pageTitle = 'new Rayon'
  faBuilding=faBuilding
  faPlusCircle=faPlusCircle
  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private stockService: StockService,
    private dialogRef: MatDialogRef<UpdateStockComponent>,
    private ngxLoader: NgxUiLoaderService,
    private swalService: SwalService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.createForm();

    if (this.data) {
      this.stockForm.patchValue(this.data)
      this.pageTitle = "edit Stock"
    }
  }

  createForm() {
    this.stockForm = this.formBuilder.group({
      libelleStock: [''],
      qte: [''],
      qteMin: [''],

    });
  }

  onSubmit() {
    if (this.data) {

      this.stockService.updateStock(this.stockForm.value, this.data.id).subscribe(
        (data) => {
          this.openSnackBar("stock updated", 'success')

          this.dialogRef.close(data);
        },
        (err) => console.log(err)
      )
    } else {

      this.stockService.addStock(this.stockForm.value).subscribe(
        (data) => {
          this.openSnackBar("stock added", 'success')
          this.dialogRef.close(data);
        },
        (err) => console.log(err)
      )

    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
