import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  helloText = '';
  constructor(
    private oauthService: OAuthService,
    private httpClient: HttpClient
  ) {}
  logout() {
    this.oauthService.logOut();
  }
  getHelloAdmin() {
    this.httpClient
      .get<{ message: string }>('http://localhost:8081/hello-admin', {
        headers: {
          Authorization: `Bearer ${this.oauthService.getAccessToken()}`,
        },
      })
      .subscribe((result: any) => {
        console.log('t => ', result.message)
        this.helloText = result.message;
      });
  }
  getHelloModerator() {
    this.httpClient
      .get<{ message: string }>('http://localhost:8081/hello-regular', {
        headers: {
          Authorization: `Bearer ${this.oauthService.getAccessToken()}`,
        },
      })
      .subscribe((result: any) => {
        this.helloText = result.message;
      });
  }
  getHelloBoth() {
    this.httpClient
      .get<{ message: string }>('http://localhost:8081/hello-both', {
        headers: {
          Authorization: `Bearer ${this.oauthService.getAccessToken()}`,
        },
      })
      .subscribe((result: any) => {
        this.helloText = result.message;
      });
  }

}
