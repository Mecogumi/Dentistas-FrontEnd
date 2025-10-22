import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-feature-card',
  imports: [],
  standalone: true,
  templateUrl: './feature-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCard {
  title = input.required<string>();
  description = input.required<string>();
  icon = input.required<string>(); // SVG content passed as string

  constructor(private sanitizer: DomSanitizer) {}

  get sanitizedIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.icon());
  }
}
