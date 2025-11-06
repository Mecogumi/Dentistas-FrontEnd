import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private authService = inject(Auth);
  private router = inject(Router);
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    // TODO: Replace with actual signup logic
    if (this.signupForm.valid) {
      const user:UserSign={
        email: this.signupForm.value.email!,
        password: this.signupForm.value.password!,
        name: this.signupForm.value.name!,
        phone: this.signupForm.value.phone!
      }
      this.authService.register(user).subscribe(
        {
          next: user => this.router.navigateByUrl("/")
        }
      )
    }

  }
  
}