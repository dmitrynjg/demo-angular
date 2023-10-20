import { OnInit, Component, SimpleChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styleUrls: ['./product-history.component.css'],
})
export class ProductHistoryComponent implements OnInit {
  @Input() isEndScroll: boolean = false;
  productsHistory: any[] = [];
  page: number = 1;
  pageSize: number = 20;
  isLoading: boolean = false;
  hasMoreData: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isEndScroll) {
      if (this.isEndScroll) {
        this.loadProducts();
      }
    }
  }

  loadProducts() {
    if (!this.hasMoreData || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.productService
      .historyList({
        page: this.page,
        limit: this.pageSize,
      })
      .subscribe((response) => {
        const newProducts = response.result.map((product) => {
          const actionName =
            product.action === 'create'
              ? 'создал'
              : product.action === 'update'
              ? 'обновил'
              : 'удалил';

          return {
            id: product.id,
            userLogin: product.userLogin,
            message: `${actionName} товар под названием ${product.productName}`,
            createdAt: new Date(product.createdAt).toLocaleDateString('ru-ru', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }),
          };
        });

        if (response.totalPages === this.page) {
          this.hasMoreData = false;
        }
        this.productsHistory = [...this.productsHistory, ...newProducts];
        this.page++;
        this.isLoading = false;
      });
  }
}
