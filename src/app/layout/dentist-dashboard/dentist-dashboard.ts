import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout'
import { Footer } from '../../shared/components/footer/footer';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

const bPoint700px = '(max-width: 700px)';
const bPoint600px = '(max-width: 600px)';

@Component({
  selector: 'app-dentist-dashboard',
  imports: [Footer, NavbarComponent],
  templateUrl: './dentist-dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DentistDashboard implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);


screenWidth700px = signal<boolean>(false);
screenWidth600px = signal<boolean>(false);

ngOnInit(): void {
  this.breakpointObserver
    .observe([bPoint700px, bPoint600px])
    .subscribe(x => {
      this.screenWidth700px.set(x.breakpoints[bPoint700px]);
      this.screenWidth600px.set(x.breakpoints[bPoint600px]);
    });
}

}
