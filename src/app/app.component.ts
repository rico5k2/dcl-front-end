import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Angular E-Commerce UI';
}
