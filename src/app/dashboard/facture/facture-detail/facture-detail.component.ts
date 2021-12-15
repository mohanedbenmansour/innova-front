import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";
import {FactureService} from "../../../core/facture.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {SwalService} from "../../../core/swal.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { faBuilding, faAnchor, faAngleDoubleLeft, faPlusCircle, faArrowCircleLeft,faUsers,faTrashAlt,faFilePdf, faPen } from '@fortawesome/free-solid-svg-icons';
import jsPDF from "jspdf";

@Component({
  selector: 'app-facture-detail',
  templateUrl: './facture-detail.component.html',
  styleUrls: ['./facture-detail.component.css']
})
export class FactureDetailComponent implements OnInit {
  facture:any
  text:any
  faFilePdf=faFilePdf
  pageTitle = 'Detail Facture';
  faBuilding=faBuilding
  faPlusCircle=faPlusCircle
  @ViewChild('content', {static: false}) el!: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator ;
  @ViewChild(MatSort, { static: true }) sort!: MatSort ;
  dataSource!: MatTableDataSource<any> ;
  constructor(private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private factureService: FactureService,
              private dialogRef: MatDialogRef<FactureDetailComponent>,
              private ngxLoader: NgxUiLoaderService,
              private swalService: SwalService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,


              @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    console.log("facture",this.data)
    this.facture=this.data
  }

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a2');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("facture.pdf");
      }
    });

  }
}
