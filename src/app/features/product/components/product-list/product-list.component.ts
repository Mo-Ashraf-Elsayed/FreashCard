import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CartService } from '../../../cart/services/cart.service';
import { WishListService } from '../../../wishList/services/wish-list.service';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly productService = inject(ProductService);
  private readonly wishListService = inject(WishListService);
  productList!: Product[];
  wishListArr: Product[] = [];
  isAdded: boolean = false;
  getAllProducts() {
    this.productService.getProducts().subscribe({
      next: ({ data }) => {
        this.productList = data;
      },
    });
  }
  getWishList() {
    this.wishListService.getUserWishList().subscribe({
      next: ({ data }) => {
        this.wishListService.wishListArr.next(data);
      },
    });
  }
  addToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        this.cartService.cartItems.next(res.numOfCartItems);
      },
    });
  }
  isProductAddedtoWishList(productId: string): boolean {
    for (let i = 0; i < this.wishListArr.length; i++) {
      if (this.wishListArr[i]._id === productId) {
        return true;
      } else if (typeof this.wishListArr[i] === 'string') {
        if ((this.wishListArr[i] as unknown as string) === productId) {
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
          this.wishListService.wishListLength.next(data.length);
          this.wishListService.wishListArr.next(data);
        },
      });
    } else {
      this.wishListService.addProductToWishList(productId).subscribe({
        next: ({ data }) => {
          this.wishListService.wishListLength.next(data.length);
          this.wishListService.wishListArr.next(data);
        },
      });
    }
  }
  ngOnInit() {
    this.getAllProducts();
    this.getWishList();
    this.wishListService.wishListArr.subscribe({
      next: (value) => {
        this.wishListArr = value;
      },
    });
  }
}
