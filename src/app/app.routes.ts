import { Routes } from '@angular/router';
import { MasterLayoutComponent } from './master/master-layout.component';
import { HomeComponent } from './master/home/home.component';
import { DetailComponent } from './master/detail/detail.component';

export const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'detail/:orderNo', component: DetailComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },

];
