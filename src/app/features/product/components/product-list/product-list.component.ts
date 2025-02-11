import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  productList!: Product[];
  private readonly productService = inject(ProductService);
  getAllProducts() {
    this.productService.getProducts().subscribe({
      next: ({ data }) => {
        this.productList = data;
      },
    });
  }
  ngOnInit() {
    this.getAllProducts();
  }
}
