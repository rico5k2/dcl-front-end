import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faCartShopping,
    faHamburger,
    faHeart,
    faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartLocalStorageService } from '../../services/shopping-cart-local-storage.service';

@Component({
    selector: 'app-header',
    imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styles: `
    .active-link {
    color: "#d1d5dc";
    text-decoration: underline;
  }
  `,
})
export class HeaderComponent {
    private readonly shoppingCartLocalStorageService = inject(
        ShoppingCartLocalStorageService
    );

    faCartShopping = faCartShopping;
    faShoppingBag = faShoppingBag;
    faHamburger = faHamburger;
    faHeart = faHeart;

    cartItemQuantity = computed(() =>
        this.shoppingCartLocalStorageService.cartItemQuantity()
    );
}
