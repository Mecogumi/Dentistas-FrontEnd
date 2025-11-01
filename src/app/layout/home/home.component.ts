import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeatureCard } from '../../shared/components/feature-card/feature-card';
import { NavbarComponent } from '../../shared/components/public-navbar/navbar.component';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeatureCard, NavbarComponent, Footer],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
calendarIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-primary-highlight" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
    <circle cx="8" cy="14" r="0.5" fill="currentColor"></circle>
    <circle cx="12" cy="14" r="0.5" fill="currentColor"></circle>
    <circle cx="16" cy="14" r="0.5" fill="currentColor"></circle>
    <circle cx="8" cy="18" r="0.5" fill="currentColor"></circle>
    <circle cx="12" cy="18" r="0.5" fill="currentColor"></circle>
    <circle cx="16" cy="18" r="0.5" fill="currentColor"></circle>
  </svg>
`;

  messageIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-primary-highlight" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `;

paymentIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-primary-highlight" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
      <path fill="var(--color-primary-highlight)" stroke="none" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.11C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" style="transform: translate(6px, 3px) scale(0.35); transform-origin: center;"/>
  </svg>
`;
}
