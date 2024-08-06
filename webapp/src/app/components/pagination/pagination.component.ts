import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [PaginatorModule, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  firstItem: number = 0;

  @Input() totalItems: number = 0;
  @Input() pageItems: number = 0;

  onPageChange(event: PageEvent) {
    this.firstItem = event.first;
    this.pageItems = event.rows;
  }
}
