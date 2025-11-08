import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  
  authService = inject(Auth);
  router = inject(Router)
  private suscription!:Subscription;  

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
      let success=false
      this.suscription= this.authService.login(this.loginForm.value.email!,this.loginForm.value.password!).subscribe({
        next: (res) => {this.router.navigateByUrl('')},
        error: (err) => console.error('Error login', err)
      })
    }
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }
}