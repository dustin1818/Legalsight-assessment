import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-landing-page',
  imports: [SharedModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  name = '';
  email = '';

  constructor(private router: Router) { }

  onGoToAssessment() {
    if (this.name && this.email) {
      localStorage.setItem('user', JSON.stringify({ name: this.name, email: this.email }));
      this.router.navigate(['/main/view-speeches']);
    }
  }
}