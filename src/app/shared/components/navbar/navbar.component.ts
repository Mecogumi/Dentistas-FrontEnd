import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  private authService = inject(Auth)
  username:string|null = null;
  isAuthenticated:boolean = false;
  ngOnInit(): void {
    this.authService.profile().subscribe(response =>{
      this.username=response.data.user.name;
      this.isAuthenticated=response.success;
    }).unsubscribe()
  }
  
}
