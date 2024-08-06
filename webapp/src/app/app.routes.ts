import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./views/products/products.component').then(
        (m) => m.ProductsComponent
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./views/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./views/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'profil',
    loadComponent: () =>
      import('./views/profil/profil.component').then((m) => m.ProfilComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./views/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./views/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
  },
];
