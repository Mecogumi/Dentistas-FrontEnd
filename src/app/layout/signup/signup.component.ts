import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
  private authService = inject(Auth);
  private router = inject(Router);
  submitted = false;

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegex)]),
  });

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      const user: UserSign = {
        email: this.signupForm.value.email!,
        password: this.signupForm.value.password!,
        name: this.signupForm.value.name!,
        phone: this.signupForm.value.phone!
      }
      this.authService.register(user).subscribe(
        {
          next: user => this.router.navigateByUrl("/"),
          error: r =>{
            window.alert("Error al registrar")
          }
        }
      )
    }
  }

  get name() { return this.signupForm.controls.name; }
  get email() { return this.signupForm.controls.email; }
  get phone() { return this.signupForm.controls.phone; }
  get password() { return this.signupForm.controls.password; }
}