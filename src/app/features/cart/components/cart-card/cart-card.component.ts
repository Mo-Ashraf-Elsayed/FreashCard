import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/cart';

@Component({
  selector: 'app-cart-card',
  imports: [],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css',
})
export class CartCardComponent {
  @Input() cartItem: Product = {} as Product;
  @Output() productData = new EventEmitter<{
    productId: string;
    count: number;
  }>();
  @Output() productId = new EventEmitter<string>();
}
