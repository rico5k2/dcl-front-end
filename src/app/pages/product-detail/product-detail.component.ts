import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartLocalStorageService } from '../../services/shopping-cart-local-storage.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductCardSkeletonComponent } from '../../components/product-card-skeleton/product-card-skeleton.component';

@Component({
  selector: 'app-product-detail',
  imports: [
    FontAwesomeModule,
    ProductCardComponent,
    ProductCardSkeletonComponent,
  ],
  template: `
    <div class="min-h-full">
      <div class="mx-auto pt-24 pb-10 max-w-7xl">
        <div class="border-y border-y-gray-900 flex justify-end py-2 mb-8">
          <div class="flex items-center gap-x-2">
            <button
              [disabled]="isFirstItem()"
              (click)="handlePrevNavigation()"
              class="btn btn-ghost btn-md"
            >
              <fa-icon [icon]="faChevronLeft"></fa-icon>
            </button>
            <button
              [disabled]="isLastItem()"
              (click)="handleNextNavigation()"
              class="btn btn-ghost btn-md"
            >
              <fa-icon [icon]="faChevronRight"></fa-icon>
            </button>
          </div>
        </div>
        <div class="flex justify-between gap-x-10">
          <div class="w-[70%]">
            @if (this.productResource.isLoading()) {
            <figure>
              <div class="w-full h-[550px] skeleton"></div>
            </figure>
            } @else {
            <figure>
              <img
                class="w-full h-[550px]"
                [src]="this.productResource.value()?.image"
                [alt]="this.productResource.value()?.title"
              />
            </figure>
            }
          </div>
          <div class="w-full">
            @if (this.productResource.isLoading()) {
            <div class="skeleton w-full h-[40px]"></div>
            <div class="skeleton w-[100px] mt-3 h-[20px]"></div>
            <div class="skeleton w-full mt-4 h-[150px]"></div>
            <div class="skeleton w-full mt-8 h-[50px]"></div>
            } @else {
            <h2 class="text-2xl font-bold mb-3">
              {{ this.productResource.value()?.title }}
            </h2>
            <h3 class="text-3xl font-bold">
              $ {{ this.productResource.value()?.price }}
            </h3>
            <p class="leading-6 mt-4">
              {{ this.productResource.value()?.description }}
            </p>
            <div class="badge badge-outline capitalize mt-2">
              {{ this.productResource.value()?.category }}
            </div>
            <button
              [disabled]="checkItemAlreadyExist()"
              (click)="addItem()"
              class="w-full btn btn-primary mt-8"
            >
              <fa-icon [icon]="faCartShopping"></fa-icon>
              Add to Cart
            </button>
            }
          </div>
        </div>
      </div>
      <div class="mx-auto pt-28 pb-10 max-w-7xl">
        <div class="mt-10">
          <h3 class="text-2xl font-bold mb-8">Other similar products</h3>
          @if (isLoadingSimilarProductResource()) {
          <div class="grid grid-cols-4 mx-auto max-w-7xl gap-6">
            @for (item of [1,2,3,4]; track item) {
            <app-product-card-skeleton />
            }
          </div>
          } @else {
          <div class="grid grid-cols-4 mx-auto max-w-7xl gap-6">
            @for (similarProduct of similarProductResource.value(); track
            similarProduct.id) {
            <app-product-card [product]="similarProduct" />
            }
          </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductDetailComponent implements OnInit {
  faCartShopping = faCartShopping;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  private readonly apiService = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly shoppingCartLocalStorageService = inject(
    ShoppingCartLocalStorageService
  );

  productId = signal<string>('');

  productResource = resource({
    request: () => ({ id: this.productId() }),
    loader: ({ request }) => this.apiService.getProductById(request.id),
  });
  similarProductResource = resource({
    request: () => ({ category: this.productResource.value()?.category }),
    loader: ({ request }) =>
      this.apiService.getProductsWithLimit(4, request.category),
  });

  isFirstItem = computed(() => Number(this.productId()) === 1);
  isLastItem = computed(() => Number(this.productId()) === 20);
  isLoading = computed(() => this.productResource.isLoading());
  isLoadingSimilarProductResource = computed(() =>
    this.similarProductResource.isLoading()
  );

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

  handlePrevNavigation() {
    if (+this.productId() <= 1) {
      return;
    }
    const newId = (Number(this.productId()) - 1).toString();
    this.productId.set(newId);
    this.router.navigate(['/products', newId]);
  }

  handleNextNavigation() {
    if (+this.productId() >= 20) {
      return;
    }

    const newId = (Number(this.productId()) + 1).toString();
    this.productId.set(newId);
    this.router.navigate(['/products', newId]);
  }

  checkItemAlreadyExist() {
    return this.shoppingCartLocalStorageService.checkItemAlreadyExist(
      this.productResource.value()?.id!
    );
  }

  addItem() {
    this.shoppingCartLocalStorageService.addItem({
      ...this?.productResource.value()!,
      quantity: 1, // Add default quantity
    });
  }
}
