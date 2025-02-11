import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  private readonly productService = inject(ProductService);
  private readonly activatedRoute = inject(ActivatedRoute);
  productId!: string | null;
  productDetails: Product = {} as Product;
  imageIndexSlider: number = 0;
  getProductId() {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get('id');
      },
    });
    console.log(this.activatedRoute.snapshot.params['id']);
  }

  getProductDetails(id: string | null) {
    this.productService.getProductDetails(id).subscribe({
      next: ({ data }) => {
        this.productDetails = data;
        console.log(this.productDetails);
      },
    });
  }
  getIndexOfImageSlider(index: number) {
    this.imageIndexSlider = index;
  }
  next() {
    if (this.imageIndexSlider === this.productDetails.images.length - 1) {
      this.imageIndexSlider = 0;
    }
    this.imageIndexSlider++;
  }
  previous() {
    if (this.imageIndexSlider === 0) {
      this.imageIndexSlider = this.productDetails.images.length - 1;
    }
    this.imageIndexSlider--;
  }
  ngOnInit() {
    this.getProductId();
    this.getProductDetails(this.productId);
  }
}
