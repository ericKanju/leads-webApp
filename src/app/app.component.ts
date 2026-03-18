import { Component } from '@angular/core';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingPageComponent],
  template: `
    <app-landing-page></app-landing-page>
  `,
  styles: [],
})
export class AppComponent {
  title = 'leads-webapp';
}
