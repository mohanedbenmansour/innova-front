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
import { SwalService } from 'src/app/core/swal.service';
@Component({
  selector: 'app-update-rayon',
  templateUrl: './update-rayon.component.html',
  styleUrls: ['./update-rayon.component.css']
})
export class UpdateRayonComponent implements OnInit {
  rayonForm!: FormGroup ;
  pageTitle = 'new Rayon'
  faBuilding=faBuilding
  faPlusCircle=faPlusCircle
  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private rayonService: RayonService,
    private dialogRef: MatDialogRef<UpdateRayonComponent>,
    private ngxLoader: NgxUiLoaderService,
    private swalService: SwalService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,



    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.createForm();

if(this.data){
  this.rayonForm.patchValue(this.data)
  this.pageTitle="edit Rayon"
}
  }

  createForm() {
    this.rayonForm = this.formBuilder.group({
      code: [''],
      libelle:[''],
      
    });
  }

  
  get f() {
    return this.rayonForm.controls;
  }

  onSubmit(){
if(this.data){

this.rayonService.updateRayon(this.rayonForm.value,this.data.id).subscribe(
  (data)=>{
    this.openSnackBar("rayon updated",'success')

  this.dialogRef.close(data);
},
  (err)=>console.log(err)
)
}else {

  this.rayonService.addRayon(this.rayonForm.value).subscribe(
    (data)=>{
    this.openSnackBar("rayon added",'success')
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
