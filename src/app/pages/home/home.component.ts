import { Component, inject, resource, computed, effect } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductCardSkeletonComponent } from '../../components/product-card-skeleton/product-card-skeleton.component';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-home',
    imports: [
        ProductCardComponent,
        ProductCardSkeletonComponent,
        FooterComponent,
    ],
    templateUrl: './home.component.html',
})
export class HomeComponent {
    constructor(private meta: Meta, private title: Title) {
        this.title.setTitle('Home');
        this.meta.updateTag({
            name: 'description',
            content:
                "Home Page - This is a modern, responsive e-commerce template built Angular and TailwindCSS. It's designed to be a starting point for building full-featured e-commerce applications. The template includes a clean and customizable design, ideal for minimalist online stores.",
        });
        this.meta.updateTag({ property: 'og:title', content: 'Home' });
        this.meta.updateTag({
            property: 'og:description',
            content:
                "Home Page - This is a modern, responsive e-commerce template built Angular and TailwindCSS. It's designed to be a starting point for building full-featured e-commerce applications. The template includes a clean and customizable design, ideal for minimalist online stores.",
        });
    }

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
