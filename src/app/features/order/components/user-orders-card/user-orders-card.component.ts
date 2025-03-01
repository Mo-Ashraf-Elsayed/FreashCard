import { Component, Input } from '@angular/core';
import { UserOrder } from '../../models/user-order';
import { DatePipe } from '@angular/common';
import { ProductsOrderComponent } from '../products-order/products-order.component';

@Component({
  selector: 'app-user-orders-card',
  imports: [DatePipe, ProductsOrderComponent],
  templateUrl: './user-orders-card.component.html',
  styleUrl: './user-orders-card.component.css',
})
export class UserOrdersCardComponent {
  @Input() userOrder: UserOrder = {} as UserOrder;
}
