import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RayonService } from 'src/app/core/rayon.service';
import { faUser, faAnchor, faAngleDoubleLeft, faPlusCircle, faArrowCircleLeft, faUsers, faTrashAlt, faPen, faChartLine, faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SwalService } from 'src/app/core/swal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateRayonComponent } from '../update-rayon/update-rayon.component';

@Component({
  selector: 'app-rayon-list',
  templateUrl: './rayon-list.component.html',
  styleUrls: ['./rayon-list.component.css']
})
export class RayonListComponent implements OnInit {
  rayonList: any
  faAngleDoubleLeft = faAngleDoubleLeft;
  faPlusCircle = faPlusCircle;
  faUsers = faUsers;
  faTrashAlt = faTrashAlt
  faPen = faPen
  faChartLine = faChartLine
  faAlignCenter = faAlignCenter


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;


  displayedColumns: string[] = ['#', 'code', 'libelle', 'actions'];
  dataSource!: MatTableDataSource<any>;


  constructor(private rayonService: RayonService,

    private toastr: ToastrService,
    private dialogRef: MatDialogRef<RayonListComponent>,
    private ngxLoader: NgxUiLoaderService,
    private swalService: SwalService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,


    @Inject(MAT_DIALOG_DATA) private data: any) { }



  ngOnInit(): void {
    this.getRayons()
  }

  getRayons() {
    this.rayonService.getRayons().subscribe(
      (data) => {
        console.log("data", data)
        this.rayonList = data;

        this.dataSource = new MatTableDataSource<any>(this.rayonList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err)
      }
    )
  }

  deleteRayon(rayonId: string) {
    this.rayonService.deleteRayon(rayonId).subscribe(
      (data) => {
        this.rayonList = this.rayonList.filter((rayon: any) => {
          return rayon.id != rayonId
        })

        this.dataSource = new MatTableDataSource<any>(this.rayonList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {

      }
    )
  }

  openDialogCreateRayon() {
    const dialogRef = this.dialog.open(UpdateRayonComponent,
      {
        width: '80%',
        height: '60%',

      });

    dialogRef.disableClose = false;
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res)
        return
      this.rayonList.push(res)

      this.dataSource = new MatTableDataSource<any>(this.rayonList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  openDialogEditRayon(element: any, index: number) {
    const dialogRef = this.dialog.open(UpdateRayonComponent,
      {
        width: '80%',
        height: '60%',
        data: element
      });

    dialogRef.disableClose = false;
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res)
        return
      this.rayonList[index] = res
      this.dataSource = new MatTableDataSource<any>(this.rayonList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
