import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import { faBuilding, faAnchor, faAngleDoubleLeft, faPlusCircle, faArrowCircleLeft,faUsers,faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {SwalService} from "../../../core/swal.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FactureService} from "../../../core/facture.service";

@Component({
  selector: 'app-facture-update',
  templateUrl: './facture-update.component.html',
  styleUrls: ['./facture-update.component.css']
})
export class FactureUpdateComponent implements OnInit {
  factureForm!: FormGroup ;
  pageTitle = 'new Facture';
  faBuilding=faBuilding
  faPlusCircle=faPlusCircle
  constructor(private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private factureService: FactureService,
              private dialogRef: MatDialogRef<FactureUpdateComponent>,
              private ngxLoader: NgxUiLoaderService,
              private swalService: SwalService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,



              @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.createForm();

    if(this.data){
      this.factureForm.patchValue(this.data)
      this.pageTitle="edit Facture"
    }
  }

  createForm() {
    this.factureForm = this.formBuilder.group({
      active: [''],
      dateFacture:[''],
      montantFacture:[''],
      montantRemise:[''],
    });
  }


  get f() {
    return this.factureForm.controls;
  }

  onSubmit(){
    if(this.data){

      this.factureService.updateFacture(this.factureForm.value,this.data.id).subscribe(
        (data)=>{
          this.openSnackBar("facture updated",'success')

          this.dialogRef.close(data);
        },
        (err)=>console.log(err)
      )
    }else {

      this.factureService.addFacture(this.factureForm.value).subscribe(
        (data)=>{
          this.openSnackBar("facture added",'success')
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
