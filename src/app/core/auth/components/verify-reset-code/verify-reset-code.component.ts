import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-reset-code',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-reset-code.component.html',
  styleUrl: './verify-reset-code.component.css',
})
export class VerifyResetCodeComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isLoading: boolean = false;
  authForm = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });
  submitForm(): void {
    if (this.authForm.controls.resetCode.valid) {
      this.isLoading = true;
      this.authService.verifyResetCode(this.authForm.value).subscribe({
        next: () => {
          this.router.navigate(['resetPassword']);
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
