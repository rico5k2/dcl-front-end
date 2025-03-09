import { Component, computed, inject, resource } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-men-clothing',
  imports: [],
  templateUrl: './men-clothing.component.html',
})
export class MenClothingComponent {
  private readonly productCategory = "men's clothing";
  private readonly apiService = inject(ApiService);

  productsResource = resource({
    loader: () => this.apiService.getProducts(this.productCategory),
  });

  isLoading = computed(() => this.productsResource.isLoading());
}
