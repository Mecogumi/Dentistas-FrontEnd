import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, Footer],
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    // TODO: Replace with actual signup logic
    if (this.signupForm.valid) {
      console.log('Form Submitted!', this.signupForm.value);
    }
  }
}