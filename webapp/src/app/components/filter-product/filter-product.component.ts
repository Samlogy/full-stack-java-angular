import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-product',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, InputTextModule],
  templateUrl: './filter-product.component.html',
  styleUrl: './filter-product.component.scss',
})
export class FilterProductComponent {
  submitted = false;

  search = {
    name: '',
    category: '',
    priceMin: '',
    priceMax: '',
  };

  constructor(private productService: ProductService) {}

  buildQuery(obj: any) {
    return Object.entries(obj)
      .filter(
        ([_, value]) => value !== null && value !== undefined && value !== ''
      )
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }

  filterProducts() {
    let query = this.buildQuery(this.search);
    console.log('query => ', query);
    this.productService.getAll(query).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error('Err Add Product: ', e),
    });
  }
}
