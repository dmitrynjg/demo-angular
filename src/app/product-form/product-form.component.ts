import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../types/services/product.types';
import { ErrorResponse } from '../types/api/response.types';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @Input() queries: string = '{}';
  id: number | null = null;
  title: string = '';
  createdAt: string = '';
  updatedAt: string = '';

  queriesJson: { id: string | null } = { id: null };
  form: FormGroup | any;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  setProductData(data: Product) {
    const options: object = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    this.title = data.name;
    this.createdAt = new Date(data.createdAt).toLocaleDateString(
      'ru-ru',
      options
    );
    this.updatedAt = new Date(data.updatedAt).toLocaleDateString(
      'ru-ru',
      options
    );
  }

  loadProduct(productId: number) {
    return this.productService.product(productId).subscribe(
      (res) => {
        const { name, price } = res;
        this.form.patchValue({ name, price });
        this.setProductData(res);
      },
      ({ error }) => {
        this.toastr.error(error?.error || 'Произошла ошибка');
        this.id = null;
      }
    );
  }
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    if (this.form.invalid) return;
    const { value } = this.form;
    const id = this.id;
    const data = id ? { id: +id, ...value } : value;
    const request = id
      ? this.productService.update(data)
      : this.productService.create(data);
    request.subscribe(
      (res) => {
        const { message, product } = res;
        if (id) this.setProductData(product);
        else {
          this.setProductData(product);
          this.id = product.id;
        }
        this.toastr.success(message);
      },
      ({ error }: { error: ErrorResponse }) => {
        this.toastr.error(error?.error || 'Ошибка');
      }
    );
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
    this.queriesJson = JSON.parse(this.queries);
    if (this.queriesJson && this.queriesJson.id) {
      this.id = +this.queriesJson.id;
      this.loadProduct(this.id);
    }
  }
}
