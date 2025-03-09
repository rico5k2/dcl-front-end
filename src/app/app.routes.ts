import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClothingsComponent } from './components/clothings/clothings.component';
import { JewelryComponent } from './components/jewelry/jewelry.component';
import { ElectronicsComponent } from './components/electronics/electronics.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'clothing', title: 'Clothings', component: ClothingsComponent },
  { path: 'jewelery', title: 'Jewelry', component: JewelryComponent },
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
