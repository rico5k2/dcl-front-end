import { Component, computed, inject } from '@angular/core';
import { ShoppingCartLocalStorageService } from '../../services/shopping-cart-local-storage.service';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShoppingCartItemComponent } from '../shopping-cart-item/shopping-cart-item.component';

@Component({
  selector: 'app-shopping-cart',
  imports: [FontAwesomeModule, ShoppingCartItemComponent],
  template: `
    <div class="mx-auto flex gap-x-20 min-h-full">
      <div class="w-full pt-28 bg-gray-800 border-r-gray-900 pl-24 pr-10">
        <h2 class="text-xl font-bold uppercase">Payment Detail</h2>
        <p>
          Complete your purchase item by providing your payment details order
        </p>
        <!-- Shipping Address -->
        <fieldset class="mt-4 fieldset px-0 p-4">
          <legend class="fieldset-legend text-lg uppercase">
            Shipping Address
          </legend>
          <textarea
            type="text"
            class="input w-full min-h-[80px]"
            placeholder="your address..."
          ></textarea>
        </fieldset>
        <!-- Payment Method -->
        <fieldset class="mt-1 fieldset px-0 p-4">
          <legend class="fieldset-legend text-lg uppercase">
            Payment Method
          </legend>

          <div class="space-y-4">
            <div class="w-full space-y-2">
              <label class="fieldset-label">Card Number</label>
              <input
                type="number"
                class="input w-full"
                placeholder="Enter your card number"
              />
            </div>
            <div class="flex items-center gap-x-2 w-full">
              <div class="w-full space-y-2">
                <label class="fieldset-label">Expiration Date</label>
                <input type="text" class="input w-full" placeholder="MM/YY" />
              </div>
              <div class="w-full space-y-2">
                <label class="fieldset-label">CVV</label>
                <input type="number" class="input w-full" placeholder="XXX" />
              </div>
            </div>
            <div class="w-full space-y-2">
              <label class="fieldset-label">Name on Card</label>
              <input
                type="text"
                class="input w-full"
                placeholder="Enter your name"
              />
            </div>
          </div>
        </fieldset>
      </div>
      <div class="w-full pt-28 pr-24 pl-10">
        <h2 class="text-xl font-bold uppercase">Summary Order</h2>
        <p>
          Check your item and select your shipping for better experience order
          item
        </p>
        <div class="mt-4 border border-gray-900 rounded-lg px-4 py-6 space-y-6">
          @for(item of cartItems(); track item.id) {
          <div
            class="border-b border-b-gray-900 pb-5 last:pb-0 last:border-b-0"
          >
            <app-shopping-cart-item [item]="item" />
          </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ShoppingCartComponent {
  faPlus = faPlus;
  faMinus = faMinus;
  faTrashCan = faTrashCan;
  private readonly shoppingCartLocalStorageService = inject(
    ShoppingCartLocalStorageService
  );

  cartItems = computed(() => this.shoppingCartLocalStorageService.cartItems());
}
