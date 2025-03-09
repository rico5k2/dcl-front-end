import { Component, computed, inject, resource } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-jewelry',
  imports: [],
  templateUrl: './jewelry.component.html',
  styles: ``,
})
export class JewelryComponent {
  private readonly productCategory = 'jewelery';
  private readonly apiService = inject(ApiService);

  productsResource = resource({
    loader: () => this.apiService.getProducts(this.productCategory),
  });

  isLoading = computed(() => this.productsResource.isLoading());
}
