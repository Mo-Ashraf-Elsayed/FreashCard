import { Component, HostListener, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { passwordMatch } from '../../../../shared/helpers/password.match';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, ValidationMessagesComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  isLoading: boolean = false;
  successMessage: boolean = false;
  errorMessage: boolean = false;
  responseMessage: string = '';
  private readonly router = inject(Router);

  private readonly formBuilder = inject(FormBuilder);
  authForm!: FormGroup;
  formInit() {
    this.authForm = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
        rePassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
      },
      { validators: passwordMatch }
    );
  }
  ngOnInit(): void {
    this.formInit();
  }

  private readonly authService = inject(AuthService);
  submitForm() {
    this.isLoading = true;
    if (this.authForm.valid) {
      this.authService.signUp(this.authForm.value).subscribe({
        next: ({ message }) => {
          this.responseMessage = message;
          this.successMessage = true;
          this.isLoading = false;
          if (message) {
            setTimeout(() => {
              this.router.navigate(['signIn']);
            }, 500);
          }
        },
        error: ({ error }) => {
          this.responseMessage = error.message;
          this.errorMessage = true;
          this.isLoading = false;
        },
      });
    } else {
      this.authForm.markAllAsTouched();
      // this.authForm.get('rePassword')?.setValue('');
      this.isLoading = false;
    }
  }
  showPassword: boolean = false;
  showRePassword: boolean = false;
  showAndHidePassword(input: string) {
    if (input === 'pass') this.showPassword = !this.showPassword;
    else this.showRePassword = !this.showRePassword;
  }
}
