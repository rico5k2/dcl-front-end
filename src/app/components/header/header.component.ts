import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartLocalStorageService } from '../../services/shopping-cart-local-storage.service';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  template: `
    <header
      class="w-full py-4 top-0 fixed bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-900 z-50"
    >
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-x-5">
          <a class="text-xl" routerLink="/">NG-Commerce</a>
          <a
            routerLink="/"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: true }"
            class="text-gray-300 hover:text-gray-100 hover:underline transition-all"
            >All</a
          >
          <a
            routerLink="/men-clothing"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: true }"
            class="text-gray-300 hover:text-gray-100 hover:underline transition-all"
            >Men</a
          >
          <a
            routerLink="/women-clothing"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: true }"
            class="text-gray-300 hover:text-gray-100 hover:underline transition-all"
            >Women</a
          >
          <a
            routerLink="/jewelry"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: true }"
            class="text-gray-300 hover:text-gray-100 hover:underline transition-all"
            >Jewelry</a
          >
          <a
            routerLink="/electronics"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: true }"
            class="text-gray-300 hover:text-gray-100 hover:underline transition-all"
            >Electronics</a
          >
        </div>
        <a routerLink="/shopping-cart">
          <button class="btn btn-lg relative">
            <fa-icon [icon]="faCartShopping"></fa-icon>
            <div class="absolute -top-2 -right-2 badge badge-primary badge-sm">
              {{ cartItemQuantity() }}
            </div>
          </button>
        </a>
      </div>
    </header>
  `,
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

  cartItemQuantity = computed(() =>
    this.shoppingCartLocalStorageService.cartItemQuantity()
  );
}
