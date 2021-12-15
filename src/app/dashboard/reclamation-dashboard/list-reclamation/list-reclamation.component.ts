import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { faUser, faAnchor, faAngleDoubleLeft, faPlusCircle, faArrowCircleLeft, faUsers, faTrashAlt, faPen, faChartLine } from '@fortawesome/free-solid-svg-icons';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";
import {ProductService} from "../../../core/product.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {SwalService} from "../../../core/swal.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UpdateProductComponent} from "../../product/update-product/update-product.component";
import {ProductChartComponent} from "../../product/product-chart/product-chart.component";
import {ReclamationService} from "../../../core/reclamation.service";

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent implements OnInit {

  listReclamation: any = [];
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

  displayedColumns: string[] = [ 'sujet', 'description', 'client', 'actions'];
  dataSource!: MatTableDataSource<any>;

  constructor(private toastr: ToastrService,
              private formBuilder: FormBuilder,
private reclamationService:ReclamationService,
              private dialogRef: MatDialogRef<ListReclamationComponent>,
              private ngxLoader: NgxUiLoaderService,
              private swalService: SwalService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.getReclamationList()
  }



  getReclamationList() {
    this.ngxLoader.startLoader('loader');
    this.reclamationService.getReclamation().subscribe(
      (reclamations: any) => {

        this.listReclamation = reclamations;

        this.dataSource = new MatTableDataSource<any>(this.listReclamation);
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


  onDelete(reclamationId: string) {
    this.swalService.confirmAlert(
      'Delete Reclamation',
      'Are you sure you want to delete this reclamation ?',
      'Delete'
    ).then((result: any) => {
      if (result.value) {


        this.reclamationService.deleteReclamation(reclamationId).subscribe(
          (data) => {
            this.openSnackBar("reclamation deleted", 'success')

            this.listReclamation = this.listReclamation.filter((product: any) => {
              return product.id != reclamationId
            })
            this.dataSource = new MatTableDataSource<any>(this.listReclamation);
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }





}
