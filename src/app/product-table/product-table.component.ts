import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../services/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorResponse } from '../types/api/response.types';
import { Product } from '../types/services/product.types';

interface TableColumn {
  name: keyof Product;
  title: string;
  field: string;
  sort?: string;
  type?: string;
}

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit {
  products: Product[] = [];
  @Input() isEndScroll = false;
  filterForm: any;
  isOpenFilter: boolean = false;
  page: number = 1;
  limit: number = 10;
  totalPages: number = 1;
  limits = [10, 20, 50, 100];

  tableHeaders: TableColumn[] = [
    { name: 'id', title: 'id', field: 'id', type: 'number' },
    { name: 'name', title: 'Название товара', field: 'name', type: 'text' },
    { name: 'price', title: 'Цена', field: 'price', type: 'number' },
    {
      name: 'createdAt',
      title: 'Дата создания',
      field: 'created_at',
      type: 'datetime-local',
    },
    {
      name: 'updatedAt',
      title: 'Дата последнего обновления',
      field: 'updated_at',
      type: 'datetime-local',
    },
  ];
  filtersType: string[] = ['like', 'not', 'equal'];
  filters: TableColumn[] = [
    ...this.tableHeaders.filter(
      (tableHeader) =>
        ['updatedAt', 'createdAt'].indexOf(tableHeader.name) === -1
    ),
  ];
  filter:
    | TableColumn
    | {
        type: 'text';
      } = {
    type: 'text',
  };

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      value: ['', Validators.required],
      field: ['', [Validators.required]],
      op: ['', [Validators.required]],
    });
    this.loadProducts();
  }

  loadNewLimit(limit: number) {
    this.setLimit(+limit);
    this.loadProducts();
  }

  setLimit(limit: number): void {
    this.limit = limit;
  }

  toggleFilter(): void {
    if (this.isOpenFilter) {
      const statusValidation = this.filterForm.invalid;
      this.filterForm.patchValue({
        value: '',
        field: '',
        op: '',
      });
      if (!statusValidation) {
        this.loadProducts();
      }
    }
    this.isOpenFilter = !this.isOpenFilter;
  }

  setFilter(column: string): void {
    const list: TableColumn[] = this.filters.filter(
      (filter) => filter.name === column
    );
    if (list.length > 0) {
      this.filter = list[0];
      this.filterForm.patchValue({ value: '' });
    }
  }

  updateSortTable(tableHeader: TableColumn): void {
    let sort;
    let field: keyof Product = 'id';
    this.tableHeaders = this.tableHeaders.map((header) => {
      if (tableHeader.name === header.name) {
        sort =
          header.sort === 'asc' ? 'desc' : header.sort === 'desc' ? '' : 'asc';
        field = header.name;
        return { ...header, sort };
      }
      return { name: header.name, field: header.field, title: header.title };
    });

    this.products =
      sort === ''
        ? this.products.sort(
            (prevProduct, nextProduct) => prevProduct.id - nextProduct.id
          )
        : sort === 'desc'
        ? this.products.sort((prevProduct, nextProduct) =>
            prevProduct[field] < nextProduct[field] ? 1 : -1
          )
        : this.products.sort((prevProduct, nextProduct) =>
            prevProduct[field] < nextProduct[field] ? -1 : 1
          );
  }

  loadProducts(): void {
    const data: any = { page: this.page, limit: this.limit };

    if (!this.filterForm.invalid) {
      const filterData = this.filterForm.value;
      data.filter = `${filterData.field}:${filterData.op}:${filterData.value}`;
    }

    const dateOptions: object = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    this.productService.list(data).subscribe((response) => {
      this.totalPages = response.totalPages;
      this.products = response.result.map((product: any) => ({
        ...product,
        createdAt: new Date(product.createdAt).toLocaleDateString(
          'ru-ru',
          dateOptions
        ),
        updatedAt: new Date(product.updatedAt).toLocaleDateString(
          'ru-ru',
          dateOptions
        ),
      }));
    });
  }

  onSubmit(): void {
    if (this.filterForm.invalid) {
      return;
    }
    this.loadProducts();
    // this.loadProducts();
  }
  nextPage() {
    this.page++;
    this.loadProducts();
  }
  prevPage() {
    this.page--;
    this.loadProducts();
  }

  deleteProduct(product: any): void {
    this.productService.delete(Number(product.id)).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.loadProducts();
      },
      ({ error }: { error: ErrorResponse }) => {
        this.toastr.error(
          error.error ? error.error : 'Не удалось удалить продукт'
        );
      }
    );
  }
}
