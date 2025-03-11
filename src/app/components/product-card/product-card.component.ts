import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../type';
import {
  faEye,
  faHeart,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShoppingCartLocalStorageService } from '../../services/shopping-cart-local-storage.service';

@Component({
  selector: 'app-product-card',
  imports: [FontAwesomeModule],
  template: `
    <div
      class="card hover:bg-base-200 transition-all bg-base-100 w-full h-full shadow-sm"
    >
      <figure>
        <img
          class="w-full h-[320px] object-fill"
          [src]="product()?.image"
          alt="Shoes"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          {{ product()?.title }}
        </h2>
        <h3 class="text-lg text-green-500">$ {{ product()?.price }}</h3>

        <p class="line-clamp-3">
          {{ product()?.description }}
        </p>
        <div class="card-actions mt-4 w-full">
          <div class="flex items-center gap-x-2 w-full justify-between">
            <div class="flex items-center gap-x-2">
              <div class="tooltip" data-tip="View Detail">
                <button class="btn btn-soft btn-sm">
                  <fa-icon [icon]="faEye"></fa-icon>
                </button>
              </div>
              <div class="tooltip" data-tip="Favorite">
                <button class="btn btn-soft btn-sm">
                  <fa-icon [icon]="faHeart"></fa-icon>
                </button>
              </div>
            </div>
            <div>
              <div class="badge badge-outline capitalize">
                {{ product()?.category }}
              </div>
            </div>
          </div>
          <button
            [disabled]="checkItemAlreadyExist()"
            (click)="addItem()"
            class="mt-2 w-full btn btn-primary"
          >
            <fa-icon [icon]="faCartShopping"></fa-icon>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  private readonly shoppingCartLocalStorageService = inject(
    ShoppingCartLocalStorageService
  );

  faHeart = faHeart;
  faEye = faEye;
  faCartShopping = faCartShopping;
  product = input<Product>();

  cartItems = computed(() => this.shoppingCartLocalStorageService.cartItems());

  addItem() {
    this.shoppingCartLocalStorageService.addItem({
      ...this?.product()!,
      quantity: 1, // Add default quantity
    });
  }

  checkItemAlreadyExist() {
    return this.cartItems().some((ct) => ct.id === this.product()?.id);
  }
}
