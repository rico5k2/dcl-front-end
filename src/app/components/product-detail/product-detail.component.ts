import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  template: `
    <div class="mt-28 pb-10">
      <div class="mx-auto max-w-7xl">
        <p>product-detail works! {{ this.productId() }}</p>
        <p>{{ this.productResource.value()?.title }}</p>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductDetailComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly route = inject(ActivatedRoute);

  productId = signal<string>('');

  productResource = resource({
    request: () => ({ id: this.productId() }),
    loader: ({ request }) => this.apiService.getProductById(request.id),
  });

  isLoading = computed(() => this.productResource.isLoading());

  errorEffect = effect(() => {
    const error = this.productResource.error() as Error;
    if (error) {
      console.log(error);
    }
  });

  ngOnInit() {
    this.route.paramMap.subscribe((param) =>
      this.productId.set(param.get('id')!)
    );
  }
}
