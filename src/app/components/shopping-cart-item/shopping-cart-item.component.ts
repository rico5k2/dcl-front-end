import { Component, inject, input } from '@angular/core';
import { Product } from '../../../type';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShoppingCartLocalStorageService } from '../../services/shopping-cart-local-storage.service';

@Component({
    selector: 'app-shopping-cart-item',
    imports: [FontAwesomeModule],
    templateUrl: './shopping-cart-item.component.html',
})
export class ShoppingCartItemComponent {
    private readonly shoppingCartLocalStorageService = inject(
        ShoppingCartLocalStorageService
    );

    faPlus = faPlus;
    faMinus = faMinus;
    faTrashCan = faTrashCan;

    item = input<Product>();

    incrementItemQuantity() {
        this.shoppingCartLocalStorageService.updateItem({
            ...this?.item()!,
            quantity: this.item()?.quantity! + 1,
        });
    }

    decrementItemQuantity() {
        // Remove item when quantity equal to 0
        if (this.item()?.quantity! <= 1) {
            this.shoppingCartLocalStorageService.removeItem(this.item()!);
        } else {
            this.shoppingCartLocalStorageService.updateItem({
                ...this?.item()!,
                quantity: this.item()?.quantity! - 1,
            });
        }
    }

    removeItemQuantity() {
        this.shoppingCartLocalStorageService.removeItem(this.item()!);
    }
}
