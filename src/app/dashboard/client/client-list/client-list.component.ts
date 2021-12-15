import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faAngleDoubleLeft, faPlusCircle, faArrowCircleLeft, faAlignCenter, faUsers, faTrashAlt, faPen, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ClientService } from 'src/app/core/client.service';
import { SwalService } from 'src/app/core/swal.service';
import { ProductListComponent } from '../../product/product-list/product-list.component';
import { UpdateClientComponent } from '../update-client/update-client.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clientList: any = [];
  faAngleDoubleLeft = faAngleDoubleLeft;
  faPlusCircle = faPlusCircle;
  faUsers = faUsers;
  faTrashAlt = faTrashAlt
  faPen = faPen
  faChartLine = faChartLine
  faAlignCenter = faAlignCenter;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  displayedColumns: string[] = ['#', 'nom', 'prenom', 'email', 'date_naissance', 'profession', 'categorie_client', 'actions'];
  dataSource!: MatTableDataSource<any>;
  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<ProductListComponent>,
    private ngxLoader: NgxUiLoaderService,
    private swalService: SwalService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  //Get List Clients
  getClients() {
    this.clientService.getClients().subscribe(
      (data) => {
        console.log(data, 'clients')
        this.clientList = data;
        this.dataSource = new MatTableDataSource<any>(this.clientList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err)
      }
    )
  }

  //delete ClientById
  deleteClient(id: string) {
    this.swalService.confirmAlert(
      'Delete Product',
      'Are you sure you want to delete this product ?',
      'Delete'
    ).then((result: any) => {
      if (result.value) {
        this.clientService.deleteClient(id).subscribe(
          (data) => {
            this.clientList = this.clientList.filter((client: any) => {
              return client.id != id
            })
            this.dataSource = new MatTableDataSource<any>(this.clientList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          (err) => {
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

  //Add Client
  openDialogCreateClient() {
    const dialogRef = this.dialog.open(UpdateClientComponent,
      {
        width: '80%',
        height: '60%',
      });
    dialogRef.disableClose = false;
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res)
        return
      this.clientList.push(res)
      this.dataSource = new MatTableDataSource<any>(this.clientList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  //Edit Client
  openDialogEditClient(element: any, index: number) {
    const dialogRef = this.dialog.open(UpdateClientComponent,
      {
        width: '80%',
        height: '60%',
        data: element
      });

    dialogRef.disableClose = false;
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res)
        return
      this.clientList[index] = res
      this.dataSource = new MatTableDataSource<any>(this.clientList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


}
