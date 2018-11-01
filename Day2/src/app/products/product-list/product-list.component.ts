import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.interface';
import { ProductService } from '../../services/product.service';
import { FavoriteService } from '../../services/favorite.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  title: string = 'Products';
  // products: Product[];
  products$: Observable<Product[]>;
  selectedProduct: Product;

  start: number = 0;
  pageSize: number = 5;
  end: number = this.pageSize;
  currentPage: number = 1;

  previousPage(): void {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.selectedProduct = null;
    this.currentPage--;
  }

  nextPage(): void {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.selectedProduct = null;
    this.currentPage++;
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
    this.router.navigateByUrl(`/products/${product.id}`);
  }

  get favorites(): number {
    return this.favoriteService.getFavoriteNumber();
  }

  constructor(
    private productService: ProductService,
    private favoriteService: FavoriteService,
    private router: Router) {
  }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

  ngOnDestroy() {

  }
}
