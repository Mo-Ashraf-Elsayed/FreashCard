import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { WishListService } from '../../../features/wishList/services/wish-list.service';
import { OrderService } from '../../../features/order/services/order.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @Input() layout!: string;
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  private readonly orderService = inject(OrderService);

  userName!: string;
  router = inject(Router);
  cartItemNum = computed(() => this.cartService.cartItems());
  wishListItemNum = computed(() => this.wishListService.wishListLength());
  ordersNum!: number;
  logOut(): void {
    this.authService.myLocalStorage('remove', 'authToken');
    this.router.navigate(['signIn']);
  }
  getOrdersNumCount() {
    this.orderService.getUserOrders().subscribe({
      next: (res) => {
        this.ordersNum = res.length;
      },
    });
  }
  defineUserName() {
    this.userName = this.authService.decodeToken().name;
  }
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.defineUserName();
      this.getOrdersNumCount();
      this.cartService.getUserCart().subscribe({
        next: (res) => {
          this.cartService.cartItems.set(res.numOfCartItems);
        },
      });
      this.wishListService.getUserWishList().subscribe({
        next: ({ data }) => {
          this.wishListService.wishListLength.set(data.length);
        },
      });
    }
  }
}
