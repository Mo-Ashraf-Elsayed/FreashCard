import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';

@Component({
  selector: 'app-reset-password',
  imports: [ValidationMessagesComponent, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  isLoading: boolean = false;
  responseMessage: string = '';
  messageError: boolean = false;
  messageSuccess: boolean = false;
  showPassword: boolean = false;
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      ),
    ]),
  });

  submitForm() {
    this.isLoading = true;
    if (this.authForm.valid) {
      this.authService.resetPassword(this.authForm.value).subscribe({
        next: (res) => {
          this.authService.myLocalStorage('set', 'authToken', res.token);
          this.router.navigate(['home']);
        },
      });
    } else {
      this.authForm.markAllAsTouched();
      this.isLoading = false;
    }
  }
  showAndHidePassword() {
    this.showPassword = !this.showPassword;
  }
}
