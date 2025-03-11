import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  imports: [],
  template: `
    <div class="mx-auto flex gap-x-20 min-h-full">
      <div
        class="w-full pt-28 bg-gray-800 border-r-gray-900 pl-24 pr-10 min-h-full"
      >
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
      <div class="w-full">
        <h2 class="text-xl font-bold uppercase">Payment Detail</h2>
        <p>
          Complete your purchase item by providing your payment details order
        </p>
        <!-- Shipping Address -->
        <fieldset class="mt-1 fieldset px-0 p-4">
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
    </div>
  `,
  styles: ``,
})
export class ShoppingCartComponent {}
