import { Routes } from '@angular/router';

import { SilobolsaMonitorComponent } from './silobolsa-monitor/silobolsa-monitor.component';
import { ProductorListComponent } from './productor/productor-list/productor-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { CampoListComponent } from './campo/campo-list/campo-list.component';
import { SilobolsaListComponent } from './silobolsa/silobolsa-list/silobolsa-list.component';

export const MaterialRoutes: Routes = [

  {
    path: 'silobolsa-monitor',
    component: SilobolsaMonitorComponent
  },
  {
    path: 'productor-list',
    component: ProductorListComponent
  },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'campo-list',
    component: CampoListComponent
  },
  {
    path: 'silobolsa-list',
    component: SilobolsaListComponent
  }
];
