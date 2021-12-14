import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faUser, faAnchor, faAngleDoubleLeft, faPlusCircle, faArrowCircleLeft, faUsers, faTrashAlt, faPen, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CartService } from 'src/app/core/cart.service';
import { ProductService } from 'src/app/core/product.service';
import { SwalService } from 'src/app/core/swal.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  productList:any
  private config = [
    {
      transform: { x: 0, y: 0, z: 0 },
      rotate: { x: 25, y: 25 },
      shadow: { pos: { x: 10, y: 10 }, blur: 5, color: '#00000040' }
    },
    {
      transform: { x: -25, y: -25, z: 10 },
      rotate: { x: 0, y: 0 },
      shadow: { pos: { x: 10, y: 10 }, blur: 5, color: '#00000040' }
    },
    {
      transform: { x: -25, y: -25, z: 40 },
      rotate: { x: 0, y: 0 },
      shadow: { pos: { x: 10, y: 10 }, blur: 5, color: '#00000040' }
    },
    {
      transform: { x: -10, y: -15, z: 25 },
      rotate: { x: 0, y: 0 },
      shadow: { pos: { x: 0, y: 0 }, blur: 0, color: '#00000040' }
    },
    {
      transform: { x: -10, y: -15, z: 25 },
      rotate: { x: 0, y: 0 },
      shadow: { pos: { x: 0, y: 0 }, blur: 0, color: '#00000040' }
    },
    {
      transform: { x: -15, y: -15, z: 15 },
      rotate: { x: 0, y: 0 },
      shadow: { pos: { x: 10, y: 10 }, blur: 5, color: '#00000040' }
    }] as Array<ConfigModel>;

    @ViewChild('parallaxRef') parallaxRef: ElementRef=new ElementRef(1);

    private get parallax(): HTMLDivElement {
      return this.parallaxRef.nativeElement as HTMLDivElement;
    }
  
    @ViewChildren('ref') ref: QueryList<ElementRef>=new QueryList;
  
    @HostListener('mousemove', ['$event'])
    public mouseMove(event: MouseEvent): void {
      if (event) {
        const rect = this.parallax.getBoundingClientRect();
        let a1 = rect.left; let a2 = a1 + rect.width; let b1 = -1; let b2 = 1;
        const x = this.mapRange(a1, a2, b1, b2, event.x);
        a1 = rect.top; a2 = a1 + rect.height; b1 = 1; b2 = -1;
        const y = this.mapRange(a1, a2, b1, b2, event.y);
  
        if (x <= 1 && x >= -1 && y <= 1 && y >= -1) {
          this.ref.forEach((element, index) => {
            this.applyStyle(this.config[index], element, { x, y, z: 1 });
          });
        }
      }
    }
  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ListProductsComponent>,
    private ngxLoader: NgxUiLoaderService,
    private swalService: SwalService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cartService:CartService
    ) { }

  ngOnInit(): void {
    this.getProductList()
  }


  
  public reset(): void {
    this.ref.forEach((element) => {
      this.clearStyle(element);
    });
    const plus = this.ref.toArray()[2].nativeElement as HTMLDivElement;
    plus.style.boxShadow = '2.5px 5px 5px 0px #00000010';
    const btn = this.ref.last.nativeElement as HTMLDivElement;
    btn.style.boxShadow = '2.5px 2.5px 5px 0px #00000030';
  }

  private mapRange(a1: number, a2: number, b1: number, b2: number, value: number): number {
    return b1 + ((value - a1) * (b2 - b1)) / (a2 - a1);
  }

  private applyStyle(config: ConfigModel, el: ElementRef, pos: PosModel3D): void {
    const element = el.nativeElement as HTMLElement;

    element.style.boxShadow = `${config.shadow.pos.x * -pos.x}px ${config.shadow.pos.y * pos.y}px ${config.shadow.blur}px ${config.shadow.color}`;
    element.style.transform = `translate3d(${config.transform.x * -pos.x}px, ${config.transform.y * pos.y}px, ${config.transform.z * pos.z}px) rotateX(${config.rotate.x * pos.y}deg) rotateY(${config.rotate.y * pos.x}deg)`;
    element.style.transition = 'none';
  }

  private clearStyle(el: ElementRef): void {
    const element = el.nativeElement as HTMLElement;
    element.style.boxShadow = `none`;
    element.style.transform = `none`;
    element.style.transition = 'all 0.75s ease';
  }


  
  getProductList() {
    this.ngxLoader.startLoader('loader');
    this.productService.getProducts().subscribe(
      (products: any) => {

        this.productList = products;
        console.log("+++", this.productList)
this.productList=this.productList.map((product:any)=>{

product.type="/assets/"+product.type+".jpg"

  return product
})
      
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
  addProductToCart(product:any){

    this.cartService.addCart(product).subscribe(
      (data)=>{
        console.log(data)
      },
      (err)=>{
        console.log(err)
      }
    )

  }

}


interface ConfigModel {
  transform: PosModel3D;
  rotate: PosModel2D;
  shadow: {
    pos: PosModel2D;
    blur: number;
    color: string;
  };
}

interface PosModel2D {
  x: number;
  y: number;
}


interface PosModel3D extends PosModel2D {
  z: number;
}
