import { Component, input } from '@angular/core';
import { Product } from '../../../type';

@Component({
  selector: 'app-product-card',
  imports: [],
  template: `
    <div
      class="card hover:bg-base-200 transition-all bg-base-100 w-full h-full shadow-sm"
    >
      <figure>
        <img
          class="w-full h-[290px] object-fill"
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
        <div class="card-actions justify-end capitalize">
          <div class="badge badge-outline">{{ product()?.category }}</div>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  product = input<Product>();
}
