import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-footer',
    imports: [],
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    currentDate = new Date().getFullYear();
}
