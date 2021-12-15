import {Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faUser, faAnchor, faAngleDoubleLeft, faPlusCircle, faArrowCircleLeft,faUsers,faTrashAlt, faPen,faChartLine ,faFilePdf,faEye} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SwalService } from 'src/app/core/swal.service';
import { FactureService } from 'src/app/core/facture.service';
import { FactureUpdateComponent } from '../facture-update/facture-update.component';

import jsPDF, { jsPDFAPI } from 'jspdf';
import {FactureDetailComponent} from "../facture-detail/facture-detail.component";

@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent implements OnInit {


  searchedKeyword: string="";
  listUsers: any = [];
  selectedUser: any;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faPlusCircle = faPlusCircle;
  faUsers = faUsers;
  faTrashAlt=faTrashAlt
  faPen=faPen
  faChartLine=faChartLine
  faFilePdf=faFilePdf
  factureList:any
  faEye=faEye

  @ViewChild('content', {static: false}) el!: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator ;
  @ViewChild(MatSort, { static: true }) sort!: MatSort ;

  displayedColumns: string[] = ['#','code','active','date_facture', 'montant_facture','client','actions'];
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

  openDialogDetailFacture(facture:any){
    const dialogRef = this.dialog.open(FactureDetailComponent,
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

  makePDF(){
    let pdf = new jsPDF('p','pt','a2');
    pdf.html(this.el.nativeElement,{
      callback: (pdf)=> {
        pdf.save("factures.pdf");
      }
    });




}

  public Searchfacture(key: any): void {
    console.log(key);
    const results: any[] = [];
    for (const s of this.factureList) {
      if (s.client.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1  || s.client.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1 || s.montantFacture.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || s.dateFacture.toLowerCase().indexOf(key.toLowerCase()) !== -1 || s.code.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        results.push(s);
      }
    }
    this.factureList = results;
    console.log(this.factureList);

    this.dataSource = new MatTableDataSource<any>(this.factureList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if ( !key) {
      this.getFactureList();
    }
  }

  stateFacture(element:any){
if(element.active){
  element.active=false
}else {
  element.active=true
}

    this.factureService.updateFacture(element,element.id).subscribe(
      (data)=>{
        this.openSnackBar("facture updated",'success')

        let factureIndex=this.factureList.findIndex((facture:any)=>{
          return facture.id==data.id
        })

        this.factureList[factureIndex]=data

        this.dataSource = new MatTableDataSource<any>(this.factureList );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err)=>console.log(err)
    )
    this.dataSource = new MatTableDataSource<any>(this.factureList );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



}
