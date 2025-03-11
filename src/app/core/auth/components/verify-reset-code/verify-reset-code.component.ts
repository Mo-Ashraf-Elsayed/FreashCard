import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-verify-reset-code',
  imports: [ReactiveFormsModule, InputOtpModule],
  templateUrl: './verify-reset-code.component.html',
  styleUrl: './verify-reset-code.component.css',
})
export class VerifyResetCodeComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  verifyCode!: FormGroup;
  isResend: boolean = false;
  initForm() {
    this.verifyCode = this.fb.group({
      resetCode: new FormControl('', [Validators.required]),
    });
  }
  submitForm(): void {
    console.log(this.verifyCode.get('resetCode')?.value.length);
    if (this.verifyCode.get('resetCode')?.value.length.toString().trim() == 6) {
      console.log(this.verifyCode.get('resetCode')?.value.length);
      this.authService.verifyResetCode(this.verifyCode.value).subscribe({
        next: () => {
          this.router.navigate(['resetPassword']);
        },
        error: () => {},
      });
    }
  }
  resendCode() {
    this.isResend = true;
    let email;
    this.activatedRoute.paramMap.subscribe({
      next: (val) => {
        email = val.get('email');
      },
    });
    let emailToObj = {
      email: email,
    };
    console.log(emailToObj);
    this.authService.forgotPassword(emailToObj).subscribe({
      next: () => {
        this.isResend = false;
      },
      error: () => {
        this.isResend = false;
      },
    });
  }
  ngOnInit() {
    this.initForm();
  }
}
