import { Routes } from '@angular/router';

import { LogInComponent } from './log-in/log-in.component';
import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'silobolsa',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
];
