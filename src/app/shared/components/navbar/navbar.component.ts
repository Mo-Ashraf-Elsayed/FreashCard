import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';

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
  router = inject(Router);
  cartItemNum!: number;
  logOut(): void {
    this.authService.localStorage('remove');
    this.router.navigate(['signIn']);
  }
  ngOnInit(): void {
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.cartItemNum = res.numOfCartItems;
      },
    });
    this.cartService.cartItems.subscribe({
      next: (value) => {
        this.cartItemNum = value;
      },
    });
  }
}
