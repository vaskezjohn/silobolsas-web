import { Routes } from '@angular/router';

import { SilobolsaMonitorComponent } from './silobolsa-monitor/silobolsa-monitor.component';
import { UserListComponent } from './user/user-list/user-list.component';

export const MaterialRoutes: Routes = [
  
  {
    path: 'silobolsa-monitor',
    component: SilobolsaMonitorComponent
  },
  {
    path: 'user-list',
    component: UserListComponent
  }
];
