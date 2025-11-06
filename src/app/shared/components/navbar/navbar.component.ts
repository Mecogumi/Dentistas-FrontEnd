import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';
import { Subscription } from 'rxjs';
import { User } from '../../../interfaces/user.interface';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(Auth);
  profile = signal<User|null>(null)
  private routerSub!: Subscription;


  

  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.profile.set(this.authService.getUser())
      }
    });
  }

  logout(){
    this.authService.logout();
  }
  
}
