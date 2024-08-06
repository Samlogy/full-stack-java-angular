import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';

import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenubarModule, CommonModule, ButtonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  items: MenuItem[] | undefined;
  isLogged = true;
  helloText = '';

  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        route: '',
      },
      {
        label: 'Products',
        icon: 'pi pi-palette',
        route: '/products',
      },
      {
        label: 'Profil',
        icon: 'pi pi-home',
        route: '/profil',
      },
      {
        label: 'Contact',
        icon: 'pi pi-home',
        route: '/contact',
      },
    ];
  }

  logout() {
    this.oauthService.logOut();
  }

  getHelloAdmin() {
    this.httpClient
      .get<{ message: string }>('http://localhost:8080/hello-admin', {
        headers: {
          Authorization: `Bearer ${this.oauthService.getAccessToken()}`,
        },
      })
      .subscribe((result) => {
        this.helloText = result.message;
      });
  }

  getHelloModerator() {
    this.httpClient
      .get<{ message: string }>('http://localhost:8080/hello-moderator', {
        headers: {
          Authorization: `Bearer ${this.oauthService.getAccessToken()}`,
        },
      })
      .subscribe((result) => {
        this.helloText = result.message;
      });
  }

  getHelloBoth() {
    this.httpClient
      .get<{ message: string }>('http://localhost:8080/hello-both', {
        headers: {
          Authorization: `Bearer ${this.oauthService.getAccessToken()}`,
        },
      })
      .subscribe((result) => {
        this.helloText = result.message;
      });
  }
}
