import { Component, computed, inject, resource } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-women-clothing',
  imports: [],
  templateUrl: './women-clothing.component.html',
  styles: ``,
})
export class WomenClothingComponent {
  private readonly productCategory = "women's clothing";
  private readonly apiService = inject(ApiService);

  productsResource = resource({
    loader: () => this.apiService.getProducts(this.productCategory),
  });

  isLoading = computed(() => this.productsResource.isLoading());
}
