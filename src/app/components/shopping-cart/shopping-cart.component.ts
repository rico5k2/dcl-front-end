import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ShoppingCartLocalStorageService } from '../../services/shopping-cart-local-storage.service';
import {
  faCheckCircle,
  faMinus,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShoppingCartItemComponent } from '../shopping-cart-item/shopping-cart-item.component';
import { Router, RouterLink } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-shopping-cart',
  imports: [FontAwesomeModule, ShoppingCartItemComponent, RouterLink],
  animations: [
    trigger('fadeInScale', [
      state('void', style({ opacity: 0, transform: 'scale(0.8)' })),
      transition(':enter', [
        animate('0.9s ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
  template: `
    <div class="mx-auto flex gap-x-20 min-h-full">
      <div class="w-full pt-28 bg-gray-800 border-r-gray-900 pl-24 pr-10">
        <h2 class="text-xl font-bold uppercase">Payment Detail</h2>
        <p>
          Complete your purchase item by providing your payment details order
        </p>
        <form (submit)="simulateCheckoutProcessing($event)">
          <!-- Shipping Address -->
          <fieldset class="mt-4 fieldset px-0 p-4">
            <legend class="fieldset-legend text-lg uppercase">
              Shipping Address
            </legend>
            <textarea
              type="text"
              required
              class="input validator w-full min-h-[80px]"
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
                  required
                  class="input validator w-full"
                  placeholder="Enter your card number"
                />
              </div>
              <div class="flex items-center gap-x-2 w-full">
                <div class="w-full space-y-2">
                  <label class="fieldset-label">Expiration Date</label>
                  <input
                    type="text"
                    required
                    class="input w-full validator"
                    placeholder="MM/YY"
                  />
                </div>
                <div class="w-full space-y-2">
                  <label class="fieldset-label">CVV</label>
                  <input
                    type="number"
                    required
                    class="input w-full validator"
                    placeholder="XXX"
                  />
                </div>
              </div>
              <div class="w-full space-y-2">
                <label class="fieldset-label">Name on Card</label>
                <input
                  required
                  type="text"
                  class="input w-full validator"
                  placeholder="Enter your name"
                />
              </div>
            </div>
          </fieldset>
          @if(cartItemQuantity() >= 1) {
          <div class="border-t border-t-gray-900 pt-4 mt-4 space-y-2">
            <div class="flex items-center justify-between">
              <span>Total Quantity</span>
              <span class="text-lg font-bold">{{ cartItemQuantity() }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Total Amount</span>
              <span class="text-lg font-bold">{{ totalPrice() }}</span>
            </div>
          </div>
          <button class="btn btn-primary w-full mt-2" type="submit">
            @if (!isLoading() && !isSuccess()) { Pay $
            {{ totalPrice() }}
            } @else if (!isLoading() && isSuccess()) { Checkout success } @else
            { Processing your payment... }
          </button>
          }
        </form>
      </div>

      <div class="w-full pt-28 pr-24 pl-10">
        <h2 class="text-xl font-bold uppercase">Summary Order</h2>
        <p>
          Check your item and select your shipping for better experience order
          item
        </p>
        <div>
          @if(cartItemQuantity() >= 1) {
          <div
            class="mt-4 border border-gray-900 rounded-lg px-4 py-6 space-y-6 max-h-[calc(100dvh-200px)] overflow-y-auto"
          >
            @for(item of cartItems(); track item.id) {
            <div
              class="border-b border-b-gray-900 pb-5 last:pb-0 last:border-b-0"
            >
              <app-shopping-cart-item [item]="item" />
            </div>
            }
          </div>
          } @else {
          <div class="mt-10 flex items-center justify-center flex-col gap-y-2">
            <p class="text-xl text-center text-gray-400">
              No item in your shopping cart
            </p>
            <a routerLink="/" class="btn btn-soft">Continue shopping</a>
          </div>
          }
        </div>
      </div>
    </div>
    <dialog #checkoutSuccessDialog class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <div class="flex items-center justify-center w-full mb-4">
          <fa-icon
            [icon]="faCheckCircle"
            class="text-6xl text-emerald-500"
            @fadeInScale
          ></fa-icon>
        </div>
        <h3 class="text-xl font-bold text-center">
          Thank you for your purchase
        </h3>
        <div class="modal-action">
          <form method="dialog">
            <button (click)="closeDialog()" class="btn btn-sm">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  `,
})
export class ShoppingCartComponent {
  faPlus = faPlus;
  faMinus = faMinus;
  faTrashCan = faTrashCan;
  faCheckCircle = faCheckCircle;
  private readonly shoppingCartLocalStorageService = inject(
    ShoppingCartLocalStorageService
  );
  private readonly router = inject(Router);

  isLoading = signal(false);
  isSuccess = signal(false);

  private checkoutSuccessDialog = viewChild<ElementRef<HTMLDialogElement>>(
    'checkoutSuccessDialog'
  );

  cartItems = computed(() => this.shoppingCartLocalStorageService.cartItems());
  cartItemQuantity = computed(() =>
    this.shoppingCartLocalStorageService.cartItemQuantity()
  );
  totalPrice = computed(() => {
    return new Intl.NumberFormat('en-IN').format(
      this.cartItems().reduce((a, c) => {
        a += c?.price * c?.quantity!;
        return a;
      }, 0)
    );
  });

  simulateCheckoutProcessing(event: Event) {
    event.preventDefault();

    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.isSuccess.set(true);
      this.checkoutSuccessDialog()?.nativeElement.showModal();
    }, 1000);
  }

  closeDialog() {
    this.checkoutSuccessDialog()?.nativeElement.close();
    this.isLoading.set(false);
    this.isSuccess.set(false);
    // Clear localStorage for shopping cart items
    this.shoppingCartLocalStorageService.clearItems();
    this.router.navigate(['/']);
  }
}
