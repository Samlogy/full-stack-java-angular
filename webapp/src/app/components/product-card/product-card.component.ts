import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() products: any[] | undefined;

  constructor(private router: Router) {}

  accessProductDetails(id: number) {
    console.log(id);
    this.router.navigate(['/product', id]);
  }
}
