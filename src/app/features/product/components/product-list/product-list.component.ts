import { Component, Inject, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../wishList/services/wish-list.service';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  productList!: Product[];
  private readonly cartService = inject(CartService);
  private readonly productService = inject(ProductService);
  private readonly wishListService = inject(WishListService);
  getAllProducts() {
    this.productService.getProducts().subscribe({
      next: ({ data }) => {
        this.productList = data;
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
  addToWishList(productId: string): void {
    this.wishListService.addProductToWishList(productId).subscribe({});
  }
  ngOnInit() {
    this.getAllProducts();
  }
}
