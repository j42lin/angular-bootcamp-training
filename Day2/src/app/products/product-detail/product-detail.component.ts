import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.interface';
import { FavoriteService } from '../../services/favorite.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  @Input()
  product: Product;

  constructor(
    private favoriteService: FavoriteService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.productService
        .getProductById(id)
        .subscribe(
          result => this.product = result,
        )
    }
  }

  newFavorite(product: Product): void {
    this.favoriteService.addFavorite(product);
  }
}
