import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Product } from '../../models/product.model';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-edit-add-product',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    FileUploadModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './edit-add-product.component.html',
  styleUrl: './edit-add-product.component.scss',
})
export class EditAddProductComponent implements OnInit {
  visible: boolean = false;
  submitted = false;

  @Input() product: Product = {
    id: 0,
    name: '',
    quantity: '',
    price: '',
    category: '',
    image: '',
  };

  productForm: FormGroup = this.fb.group({});

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  onUpload(event: UploadEvent) {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }

  addProduct() {
    if (!this.productForm.valid) return;
    console.log(this.productForm.value);
    // this.productService.create(this.productForm.value).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.submitted = true;
    //     this.visible = false;
    //   },
    //   error: (e) => console.error('Err Add Product: ', e),
    // });
  }
  editProduct(productId: number) {
    if (!this.productForm.valid) return;
    console.log(this.productForm.value);

    this.productService.update(productId, this.productForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.visible = false;
        this.submitted = true;
      },
      error: (err) => {
        console.error('Err Delete by ID: ', err);
        this.visible = false;
      },
    });
  }

  ngOnInit(): void {
    // this.loadProducts();

    this.productForm = this.fb.group({
      name: [this.product.name, Validators.required],
      price: [this.product.price, Validators.required],
      quantity: [this.product.quantity, Validators.required],
      category: [this.product.category, Validators.required],
      image: [this.product.image, Validators.required],
    });
  }
}
