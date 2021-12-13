import { ClientService } from 'src/app/core/client.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faBuilding, faAnchor, faAngleDoubleLeft, faPlusCircle, faArrowCircleLeft, faUsers, faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/core/product.service';
import { RayonService } from 'src/app/core/rayon.service';
import { SwalService } from 'src/app/core/swal.service';
@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {
  clientForm!: FormGroup;
  pageTitle = 'new Client'
  faBuilding = faBuilding
  faPlusCircle = faPlusCircle
  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<UpdateClientComponent>,
    private ngxLoader: NgxUiLoaderService,
    private swalService: SwalService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.createForm();
    if (this.data) {
      this.clientForm.patchValue(this.data)
      this.pageTitle = "edit Client"
    }
  }

  createForm() {
    this.clientForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      date_naissance: [''],
      profession: [''],
      categorie_client: ['']
    });
  }

  get f() {
    return this.clientForm.controls;
  }

  onSubmit() {
    if (this.data) {
      console.log("++++")
      this.clientService.updateClient(this.clientForm.value, this.data.id).subscribe(
        (data) => {
          console.log(data, 'data edited')
          this.openSnackBar("client updated", 'success')
          this.dialogRef.close(data);
        },
        (err) => console.log(err)
      )
    } else {
      this.clientService.addClient(this.clientForm.value).subscribe(
        (data) => {
          console.log(data, 'data add client')
          this.openSnackBar("client added", 'success')
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
