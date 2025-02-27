import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../services/wish-list.service';
import { ProductCardComponent } from '../../../product/components/product-card/product-card.component';
import { Product } from '../../../product/models/product';
import { CartService } from '../../../cart/services/cart.service';
import { ProductService } from '../../../product/services/product.service';

@Component({
  selector: 'app-wish-list',
  imports: [ProductCardComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent implements OnInit {
  private readonly wishListService = inject(WishListService);
  private readonly cartService = inject(CartService);
  private readonly productService = inject(ProductService);
  userWishList: Product[] = [];
  userWishListAfterDelete: Product[] = [];

  getUserWishList(): void {
    this.wishListService.getUserWishList().subscribe({
      next: ({ data }) => {
        this.userWishList = data;
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
  removeFromWishList(productId: string): void {
    this.userWishListAfterDelete = [];
    this.wishListService.removeProductFromWishList(productId).subscribe({
      next: ({ data }) => {
        this.wishListService.wishListLength.set(data.length);
        for (let i = 0; i < data.length; i++) {
          this.productService.getProductDetails(data[i]).subscribe({
            next: (data) => {
              this.userWishListAfterDelete.push(data.data);
            },
          });
        }
        this.userWishList = this.userWishListAfterDelete;
        this.wishListService.wishListArr.set(this.userWishList);
      },
    });
  }
  ngOnInit(): void {
    this.getUserWishList();
  }
}
