import { Component, inject, resource, computed, effect } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent],
  template: `
    @if (isLoading()) {
    <p>this is loading...</p>
    } @else {
    <div class="grid grid-cols-3 mx-auto max-w-5xl gap-6">
      @for (product of productsResource.value(); track product.id) {
      <app-product-card [product]="product" />
      }
    </div>
    }
  `,
})
export class HomeComponent {
  private readonly apiService = inject(ApiService);

  productsResource = resource({
    loader: () => this.apiService.getProducts(),
  });

  isLoading = computed(() => this.productsResource.isLoading());

  errorEffect = effect(() => {
    const error = this.productsResource.error() as Error;
    if (error) {
      console.log(error);
    }
  });
}
