import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FilterProductComponent } from '../../components/filter-product/filter-product.component';
import { EditAddProductComponent } from '../../components/edit-add-product/edit-add-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    DialogModule,
    PaginationComponent,
    ProductCardComponent,
    FilterProductComponent,
    EditAddProductComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: Product[] = [];
  submitted = false;
  product = {};

  pageItems = 10;
  totalItems = 100;

  data: Product[] = [
    {
      id: 1,
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      name: 'Produit 1',
      quantity: 10,
      price: 10.15,
      category: 'IT',
    },
    {
      id: 2,
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      name: 'Produit 1',
      quantity: 10,
      price: 10.15,
      category: 'IT',
    },
    {
      id: 3,
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      name: 'Produit 1',
      quantity: 10,
      price: 10.15,
      category: 'IT',
    },
  ];

  constructor(private productService: ProductService) {}

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (res) => {
        console.log(res);
        this.products = this.data;
        this.totalItems = this.products.length;
      },
      error: (e) => console.error('Err getAll: ', e),
    });
  }

  ngOnInit() {
    // this.loadProducts();
    this.products = this.data;
  }
}
