import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent {
  user: any = {};

  constructor() {}

  ngOnInit() {
    this.user = {
      name: 'Sam sam',
      email: 'sam@gmail.com',
      phone: '540498180',
    };
  }
}
