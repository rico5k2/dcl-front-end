import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../type';
import {
    faEye,
    faHeart,
    faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShoppingCartLocalStorageService } from '../../services/shopping-cart-local-storage.service';
import { Router } from '@angular/router';
import { FavoriteItemsLocalStorageService } from '../../services/favorite-items-local-storage.service';

@Component({
    selector: 'app-product-card',
    imports: [FontAwesomeModule],
    templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
    private readonly shoppingCartLocalStorageService = inject(
        ShoppingCartLocalStorageService
    );
    private readonly favoriteItemsLocalStorageService = inject(
        FavoriteItemsLocalStorageService
    );
    private readonly router = inject(Router);

    faHeart = faHeart;
    faEye = faEye;
    faCartShopping = faCartShopping;
    product = input<Product>();

    cartItems = computed(() =>
        this.shoppingCartLocalStorageService.cartItems()
    );

    addItem() {
        this.shoppingCartLocalStorageService.addItem({
            ...this?.product()!,
            quantity: 1, // Add default quantity
        });
    }

    checkItemAlreadyExist() {
        return this.shoppingCartLocalStorageService.checkItemAlreadyExist(
            this.product()?.id!
        );
    }

    checkFavoriteItemAlreadyExist() {
        return this.favoriteItemsLocalStorageService.checkItemAlreadyExist(
            this.product()?.id!
        );
    }

    toggleFavoriteItem() {
        if (this.checkFavoriteItemAlreadyExist()) {
            this.favoriteItemsLocalStorageService.removeItem(this.product()!);
        } else {
            this.favoriteItemsLocalStorageService.addItem(this.product()!);
        }
    }

    onClickNavigate() {
        this.router.navigate(['/products', this.product()?.id]);
    }
}
