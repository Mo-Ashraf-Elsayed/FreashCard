import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/user-order';

@Component({
  selector: 'app-products-order',
  imports: [],
  templateUrl: './products-order.component.html',
  styleUrl: './products-order.component.css',
})
export class ProductsOrderComponent {
  @Input() productsOrder!: CartItem[];
}
