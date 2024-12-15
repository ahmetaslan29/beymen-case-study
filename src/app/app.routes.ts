import { Routes } from '@angular/router';
import { MasterLayoutComponent } from './master/master-layout.component';
import { HomeComponent } from './master/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'detail/:orderNo',
        loadComponent: () =>
          import('./master/detail/detail.component').then((m) => m.DetailComponent),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
