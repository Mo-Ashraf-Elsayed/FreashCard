import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-check-out',
  imports: [ValidationMessagesComponent, ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly orderService = inject(OrderService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly platformId = inject(PLATFORM_ID);
  cartId!: string | null;
  authForm!: FormGroup;
  isLoading: boolean = false;
  checkOutForm(): void {
    this.authForm = this.fb.group({
      details: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')],
      ],
      city: ['', Validators.required],
    });
  }
  getCartId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.cartId = params.get('cartId');
    });
  }
  submitForm(): void {
    if (this.authForm.valid) {
      this.isLoading = true;
      this.orderService
        .checkOut(this.cartId, { shippingAddress: this.authForm.value })
        .subscribe({
          next: (res) => {
            if (isPlatformBrowser(this.platformId))
              window.location.href = res.session.url;
            this.isLoading = false;
          },
        });
    } else {
      this.authForm.markAllAsTouched();
      this.isLoading = false;
    }
  }
  ngOnInit(): void {
    this.checkOutForm();
    this.getCartId();
  }
}
