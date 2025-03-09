import { Injectable } from '@angular/core';
import { Product } from '../../type';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'https://fakestoreapi.com';

  async getProducts(category?: string): Promise<Product[]> {
    const data = await fetch(
      category
        ? `${this.url}/products/category/${category}`
        : `${this.url}/products`
    );
    return (await data.json()) ?? [];
  }
}
