import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';

@Component({
  selector: 'app-sign-in',
  imports: [ValidationMessagesComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  isLoading: boolean = false;
  responseMessage: string = '';
  messageError: boolean = false;
  messageSuccess: boolean = false;
  showPassword: boolean = false;
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
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
  submitForm() {
    this.isLoading = true;
    if (this.authForm.valid) {
      this.authService.signIn(this.authForm.value).subscribe({
        next: (res) => {
          this.isLoading = true;
          this.messageSuccess = true;
          this.authService.myLocalStorage('set', 'authToken', res.token);
          if (res.message) {
            this.responseMessage = res.message;
            setTimeout(() => {
              this.router.navigate(['home']);
            }, 500);
          }
        },
        error: (error) => {
          this.messageError = true;
          this.responseMessage = error.error.message;
          this.isLoading = false;
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
