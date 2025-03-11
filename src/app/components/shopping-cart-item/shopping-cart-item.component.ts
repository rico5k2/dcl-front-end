import { Component, input } from '@angular/core';
import { Product } from '../../../type';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-shopping-cart-item',
  imports: [FontAwesomeModule],
  template: `
    <div class="flex items-start justify-start gap-x-4">
      <figure>
        <img
          class="h-[110px] w-[120px] object-fill"
          [src]="item()?.image"
          alt="Shoes"
        />
      </figure>
      <div class="w-full">
        <div class="space-y-1">
          <p class="font-bold">{{ item()?.title }}</p>
          <p class="font-bold text-lg mt-auto">$ {{ item()?.price }}</p>
        </div>
        <div class="mt-5 flex items-center justify-between gap-x-4">
          <div class="flex items-center gap-x-2">
            <button class="btn btn-soft btn-sm">
              <fa-icon [icon]="faMinus"></fa-icon>
            </button>
            <span>{{ item()?.quantity }}</span>
            <button class="btn btn-soft btn-sm">
              <fa-icon [icon]="faPlus"></fa-icon>
            </button>
          </div>
          <button class="btn btn-soft btn-error btn-sm">
            <fa-icon [icon]="faTrashCan"></fa-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ShoppingCartItemComponent {
  faPlus = faPlus;
  faMinus = faMinus;
  faTrashCan = faTrashCan;

  item = input<Product>();
}
