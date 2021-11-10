import { Routes } from '@angular/router';

import { LogInComponent } from './modules/auth/log-in/log-in.component';
import { FullComponent } from './modules/layouts/full.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { EstadisticasComponent } from './modules/home/estadisticas/estadisticas.component';

export const AppRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        redirectTo: '/estadisticas',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./modules/home/silobolsas.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
];
