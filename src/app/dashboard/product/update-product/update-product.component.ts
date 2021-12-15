import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faBuilding, faAnchor, faAngleDoubleLeft, faPlusCircle, faArrowCircleLeft,faUsers,faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/core/product.service';
import { SwalService } from 'src/app/core/swal.service';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productForm!: FormGroup ;
  pageTitle = 'new Product'
  faBuilding=faBuilding
  faPlusCircle=faPlusCircle
  submitted: boolean = false;

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<UpdateProductComponent>,
    private ngxLoader: NgxUiLoaderService,
    private swalService: SwalService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,



    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.createForm();
console.log(this.data)

if(this.data){
  this.productForm.patchValue(this.data)
  this.pageTitle="edit Product"
}
  }

  createForm() {
    this.productForm = this.formBuilder.group({
      code: ['', Validators.required],
      libelle:['', Validators.required],
      prixUnitaire:['', Validators.required],
      type:["", Validators.required]
    });
  }

  
  get f() {
    return this.productForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if (this.productForm.invalid) {
      this.productForm.setErrors({ ...this.productForm.errors, 'Error': true });
      return;
    }
if(this.data){
this.productService.updateProduct(this.productForm.value,this.data.id).subscribe(
  (data)=>{
    this.openSnackBar("product updated",'success')

  this.dialogRef.close(data);
},
  (err)=>console.log(err)
)
}else {
  this.productService.addProduct(this.productForm.value).subscribe(
    (data)=>{
    this.openSnackBar("product added",'success')
    this.dialogRef.close(data);
  },
    (err)=>console.log(err)
  )
  
}



  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
