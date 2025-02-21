import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { CartCardComponent } from '../cart-card/cart-card.component';
import { Cart, Product } from '../../models/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  imports: [CartCardComponent, RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css',
})
export class CartListComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  cartList: Product[] = [];
  totalPrice!: number;
  getCartList(): void {
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;
      },
    });
  }
  addToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;
      },
    });
  }
  updateCartProductQuantity(productId: string, count: number): void {
    this.cartService.updateProductQuanity(productId, count).subscribe({
      next: (res) => {
        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;
      },
    });
  }
  removeItemFromCart(productId: string): void {
    this.cartService.removeProductFromCart(productId).subscribe({
      next: (res) => {
        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;
        this.cartService.cartItems.next(res.numOfCartItems);
      },
    });
  }
  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        if ((res.message = 'success')) {
          this.cartList = [];
          this.totalPrice = 0;
          this.cartService.cartItems.next(0);
        }
      },
    });
  }
  ngOnInit(): void {
    this.getCartList();
  }
}
