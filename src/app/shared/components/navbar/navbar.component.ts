import { ChangeDetectionStrategy, Component, Inject, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';
import { Subscription } from 'rxjs';
import { Profile } from '../../../interfaces/profile.interface';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  private authService = inject(Auth)
  private suscription!:Subscription;
  profile = signal<Profile|null>(null)

  ngOnInit(): void {
    this.suscription= this.authService.profile().subscribe({
        next: (res) => {this.profile.set(res)},
        error: (err) => console.error('Error login', err)
      })
  }

  logout(){
    localStorage.removeItem("token");
  }
  
}
