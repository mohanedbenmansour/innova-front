import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faUser, faAnchor, faAngleDoubleLeft, faPlusCircle, faArrowCircleLeft,faUsers,faTrashAlt, faPen,faChartLine } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SwalService } from 'src/app/core/swal.service';
import { FactureService } from 'src/app/core/facture.service';
import { FactureUpdateComponent } from '../facture-update/facture-update.component';
import {ProductService} from "../../../core/product.service";
import {UpdateProductComponent} from "../../product/update-product/update-product.component";
@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent implements OnInit {



  listUsers: any = [];
  selectedUser: any;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faPlusCircle = faPlusCircle;
  faUsers = faUsers;
  faTrashAlt=faTrashAlt
  faPen=faPen
  faChartLine=faChartLine
  factureList:any


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator ;
  @ViewChild(MatSort, { static: true }) sort!: MatSort ;

  displayedColumns: string[] = ['#','active','date_facture', 'montant_facture','montant_remise','client','actions'];
  dataSource!: MatTableDataSource<any> ;


  constructor(private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private factureService: FactureService,
              private dialogRef: MatDialogRef<FactureListComponent>,
              private ngxLoader: NgxUiLoaderService,
              private swalService: SwalService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,


              @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.getFactureList();
  }


  openDialogCreateFacture(){

    const dialogRef = this.dialog.open(FactureUpdateComponent,
      {
        width: '80%',
        height: '60%',

      });

    dialogRef.disableClose = false;
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res)
        return
      this.factureList.push(res)
      this.dataSource = new MatTableDataSource<any>(this.factureList );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialogEditFacture(facture:any){
    const dialogRef = this.dialog.open(FactureUpdateComponent,
      {
        width: '80%',
        height: '60%',
        data: facture
      });

    dialogRef.disableClose = false;
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res)
        return
      let factureIndex=this.factureList.findIndex((facture:any)=>{
        return facture.id==res.id
      })

      this.factureList[factureIndex]=res

      this.dataSource = new MatTableDataSource<any>(this.factureList );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }
  getFactureList() {
    this.ngxLoader.startLoader('loader');
    this.factureService.getFactures().subscribe(
      (factures: any) => {

        this.factureList = factures ;
        console.log("+++",this.factureList)

        this.dataSource = new MatTableDataSource<any>(this.factureList );
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

  openDialogEditFacrure(facture:any){
    const dialogRef = this.dialog.open(FactureUpdateComponent,
      {
        width: '80%',
        height: '60%',
        data: facture
      });

    dialogRef.disableClose = false;
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res)
        return
      let factureIndex=this.factureList.findIndex((facture:any)=>{
        return facture.id==res.id
      })

      this.factureList[factureIndex]=res

      this.dataSource = new MatTableDataSource<any>(this.factureList );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  onDelete(factureId:string){

    this.swalService.confirmAlert(
      'Delete Invoice',
      'Are you sure you want to delete this invoice ?',
      'Delete'
    ).then((result: any) => {
      if (result.value) {


        this.factureService.deleteFacture(factureId).subscribe(
          (data)=>{
            this.openSnackBar("Invoice deleted",'success')

            this.factureList=this.factureList.filter((facture:any)=>{
              return facture.id!=factureId
            })
            this.dataSource = new MatTableDataSource<any>(this.factureList );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

          },(err)=>{
            console.log('error', err)
            this.openSnackBar("server error",'error')

          }
        )}})
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
