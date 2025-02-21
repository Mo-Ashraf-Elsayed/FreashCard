import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../../cart/services/cart.service';
import { WishListService } from '../../../wishList/services/wish-list.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  productId!: string | null;
  productDetails: Product = {} as Product;
  imageIndexSlider: number = 0;
  isAddedToWishList!: boolean;

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetails(this.productId);
  }
  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get('id');
      },
    });
  }
  getProductDetails(id: string | null): void {
    this.productService.getProductDetails(id).subscribe({
      next: ({ data }) => {
        this.productDetails = data;
      },
    });
  }
  addToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe({});
  }
  addToWishList(productId: string): void {
    this.wishListService.addProductToWishList(productId).subscribe({});
    this.isAddedToWishList = true;
  }
  getIndexOfImageSlider(index: number): void {
    this.imageIndexSlider = index;
  }
  next(): void {
    if (this.imageIndexSlider === this.productDetails.images.length - 1) {
      this.imageIndexSlider = 0;
      return;
    }
    this.imageIndexSlider++;
  }
  previous(): void {
    if (this.imageIndexSlider === 0) {
      this.imageIndexSlider = this.productDetails.images.length - 1;
      return;
    }
    this.imageIndexSlider--;
  }
}
