import { Component, computed, inject, OnInit } from '@angular/core';
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
  productDetails!: Product;
  imageIndexSlider: number = 0;
  userWishList = computed(() => this.wishListService.wishListArr());

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetails(this.productId);
  }
  isProductAddedtoWishList(productId: string): boolean {
    for (let i = 0; i < this.userWishList().length; i++) {
      if (this.userWishList()[i]._id === productId) {
        return true;
      } else if (typeof this.userWishList()[i] === 'string') {
        if ((this.userWishList()[i] as unknown as string) === productId) {
          return true;
        }
      }
    }
    return false;
  }
  toggleFromWishList(productId: string): void {
    if (this.isProductAddedtoWishList(productId)) {
      this.wishListService.removeProductFromWishList(productId).subscribe({
        next: ({ data }) => {
          this.wishListService.wishListLength.set(data.length);
          this.wishListService.wishListArr.set(data);
        },
      });
    } else {
      this.wishListService.addProductToWishList(productId).subscribe({
        next: ({ data }) => {
          this.wishListService.wishListLength.set(data.length);
          this.wishListService.wishListArr.set(data);
        },
      });
    }
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
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        this.cartService.cartItems.set(res.numOfCartItems);
      },
    });
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
