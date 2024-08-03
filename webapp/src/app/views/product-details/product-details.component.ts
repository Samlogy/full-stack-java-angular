import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditAddProductComponent } from '../../components/edit-add-product/edit-add-product.component';
import { DeleteProductComponent } from '../../components/delete-product/delete-product.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    EditAddProductComponent,
    DeleteProductComponent,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  productId: number | undefined;
  // @Input()
  product: Product = {
    id: 0,
    name: '',
    quantity: '',
    price: '',
    image: '',
    category: '',
  };
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  loadProduct(productId: number) {
    this.productService.get(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.product = res;
      },
      error: (err) => console.error('Err get by ID: ', err),
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = +params.get('id')!;
      // this.loadProduct(this.productId);
      this.product = {
        id: 1,
        image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
        name: 'Produit 1',
        quantity: 10,
        price: 10.15,
        category: 'IT',
      };
    });
  }
}
