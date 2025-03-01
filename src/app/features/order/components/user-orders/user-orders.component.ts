import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { OrderService } from '../../services/order.service';
import { UserOrder } from '../../models/user-order';
import { UserOrdersCardComponent } from '../user-orders-card/user-orders-card.component';

@Component({
  selector: 'app-user-orders',
  imports: [UserOrdersCardComponent],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css',
})
export class UserOrdersComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  userOrders!: UserOrder[];
  getUserOrders(): void {
    this.orderService.getUserOrders().subscribe({
      next: (res) => {
        this.userOrders = res;
        console.log(this.userOrders);
      },
    });
  }
  ngOnInit(): void {
    this.getUserOrders();
  }
}
