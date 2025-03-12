import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JewelryComponent } from './components/jewelry/jewelry.component';
import { ElectronicsComponent } from './components/electronics/electronics.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { MenClothingComponent } from './components/men-clothing/men-clothing.component';
import { WomenClothingComponent } from './components/women-clothing/women-clothing.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  {
    path: 'products/:id',
    title: 'Product Details',
    component: ProductDetailComponent,
  },
  {
    path: 'men-clothing',
    title: `Men's Clothings`,
    component: MenClothingComponent,
  },
  {
    path: 'women-clothing',
    title: `Women's Clothings`,
    component: WomenClothingComponent,
  },
  { path: 'jewelry', title: 'Jewelry', component: JewelryComponent },
  {
    path: 'electronics',
    title: 'Electronics',
    component: ElectronicsComponent,
  },
  {
    path: 'shopping-cart',
    title: 'Shopping Cart',
    component: ShoppingCartComponent,
  },
];
