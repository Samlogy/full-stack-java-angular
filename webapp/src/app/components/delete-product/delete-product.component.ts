import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [CommonModule, ToastModule, ConfirmDialogModule, DialogModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss',
})
export class DeleteProductComponent {
  @Input() productId: number = 0;
  visible = false;
  submitted = false;

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  deleteProduct(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.productService.delete(this.productId).subscribe({
          next: (res) => {
            console.log(res);
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Record deleted',
            });
          },
          error: (err) => {
            console.error('Err Delete by ID: ', err);
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
