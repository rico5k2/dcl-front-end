import { Component, inject, resource, computed, effect } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductCardSkeletonComponent } from '../product-card-skeleton/product-card-skeleton.component';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, ProductCardSkeletonComponent],
  template: `
    <div class="mt-28 pb-10">
      @if (isLoading()) {
      <div class="grid grid-cols-4 mx-auto max-w-7xl gap-6">
        @for (item of [1,2,3,4]; track item) {
        <app-product-card-skeleton />
        }
      </div>
      } @else {
      <div class="grid grid-cols-4 mx-auto max-w-7xl gap-6">
        @for (product of productsResource.value(); track product.id) {
        <app-product-card [product]="product" />
        }
      </div>

      }
    </div>
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
