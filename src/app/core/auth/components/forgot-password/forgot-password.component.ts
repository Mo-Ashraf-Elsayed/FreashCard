import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ValidationMessagesComponent, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isLoading: boolean = false;
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  submitForm(): void {
    if (this.authForm.valid) {
      this.isLoading = true;
      console.log(this.authForm.value);
      this.authService.forgotPassword(this.authForm.value).subscribe({
        next: () => {
          this.router.navigate([
            `verifyCode/${this.authForm.get('email')?.value}`,
          ]);
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
