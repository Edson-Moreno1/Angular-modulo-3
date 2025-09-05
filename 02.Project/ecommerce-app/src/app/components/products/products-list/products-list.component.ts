import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../../../core/types/Products';
import { ProductsCardComponent } from "../products-card/products-card.component";
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
  selector: 'app-products-list',
  imports: [ ProductsCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit{
  productResponse!:ProductResponse;

  constructor(private productsService: ProductsService){}
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(page:number=1, limit:number=10){
    this.productsService.getProducts(page, limit).subscribe({
      next:(data)=>{
        console.log(data);
        this.productResponse = data;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
