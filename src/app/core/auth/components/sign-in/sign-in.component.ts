import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';

@Component({
  selector: 'app-sign-in',
  imports: [ValidationMessagesComponent, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  isLoading: boolean = false;
  responseMessage: string = '';
  private readonly router = inject(Router);
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      ),
    ]),
  });
  passwordMatch(control: AbstractControl) {
    return control.get('password')?.value === control.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }
  private readonly authService = inject(AuthService);
  submitForm() {
    this.isLoading = true;
    if (this.authForm.valid) {
      this.authService.signIn(this.authForm.value).subscribe({
        next: ({ message }) => {
          this.isLoading = false;
          if (message) {
            setTimeout(() => {
              this.router.navigate(['home']);
            }, 500);
          }
        },
        error: ({ error }) => {
          this.responseMessage = error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.authForm.markAllAsTouched();
    }
  }
  showPassword: boolean = false;
  showAndHidePassword() {
    this.showPassword = !this.showPassword;
  }
}
