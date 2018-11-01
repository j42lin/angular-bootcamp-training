import { Injectable } from '@angular/core';
import { Product } from '../products/product.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  constructor() { }

  private favorites: Set<Product> = new Set();

  addFavorite(product: Product) {
    this.favorites.add(product);
  }

  getFavoriteNumber(): number {
    return this.favorites.size;
  }
}
