import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Product } from '../products/product.interface';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, flatMap, first, catchError, shareReplay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = 'http://storerestservice.azurewebsites.net/api/products/';
  private products$: Observable<Product[]>;

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMsg: string;
    if (errorResponse.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMsg = 'An error occurred:' + errorResponse.error.message;
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMsg = `Backend returned code ${errorResponse.status}, body was: ${errorResponse.error}`;
    }
    console.error(errorMsg);
    return throwError(errorMsg);
  }

  getProductById(id: number) {
    return this
            .getProducts()
            .pipe(
              flatMap(result => result),
              first(product => product.id == id)
            )
  }

  getProducts(): Observable<Product[]> {
    if (!this.products$) {
      this.products$ = this.http
      .get<Product[]>(this.baseUrl)
      .pipe(
        shareReplay(),
        catchError(this.handleError)
      );
    }
    return this.products$;
  }

  insertProduct(newProduct: Product): Observable<Product> {
    return this.http
        .post<Product>(this.baseUrl, newProduct);
  }

  clearCache(): void {
    this.products$ = null;
  }
}
