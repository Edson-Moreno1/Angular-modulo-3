import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
  selector: 'app-products-list',
  imports: [],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit{


  constructor(private productsService: ProductsService){}
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(page:number=1, limit:number=10){
    this.productsService.getProducts(page, limit).subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
