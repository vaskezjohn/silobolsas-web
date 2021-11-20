import { Routes } from '@angular/router';

import { SilobolsaMonitorComponent } from './silobolsa-monitor/silobolsa-monitor.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { CampoListComponent } from './campo/campo-list/campo-list.component';
import { SilobolsaListComponent } from './silobolsa/silobolsa-list/silobolsa-list.component';
import { ProductorListComponent } from './productor/productor-list/productor-list.component';
import { DispositivoListComponent } from './dispositivo/dispositivo-list/dispositivo-list.component';
import { DispositivoAbmComponent } from './dispositivo/dispositivo-abm/dispositivo-abm.component';
import { HistoricoAlarmaListComponent } from './historicoalarma/historicoalarma-list.component';
import { TableroComponent} from './tablero/tablero.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { GranosListComponent } from './granos/granos-list/granos-list.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AlarmaListComponent } from './alarma/alarma-list/alarma-list.component';
import { AlarmaRangosComponent } from './alarma/alarma-rangos/alarma-rangos.component';
import { AlarmaAbmComponent } from './alarma/alarama-abm/alarma-abm.component';
import { AlarmaViewComponent } from './alarma/alarma-view/alarma-view.component';

export const MaterialRoutes: Routes = [

  {
    path: 'silobolsa-monitor',
    component: SilobolsaMonitorComponent
  },
  {
    path: 'silobolsa-monitor/detail/:id',
    component: SilobolsaMonitorComponent,
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
    path: 'grano-list',
    component: GranosListComponent
  },
  {
    path: 'campo-list',
    component: CampoListComponent
  },
  {
    path: 'silobolsa-list',
    component: SilobolsaListComponent
  },
  {
    path: 'dispositivo-list',
    component: DispositivoListComponent
  },
  {
    path: 'dispositivo-abm',
    component: DispositivoAbmComponent
  },
  {
    path: 'historicoalarma-list',
    component: HistoricoAlarmaListComponent
  },
  {
    path: 'tablero',
    component: TableroComponent
  },
  {
    path: 'estadisticas',
    component: EstadisticasComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'alarma-list',
    component: AlarmaListComponent
  },
  {
    path: 'alarma-rangos/:granosId/:unidadesMedidasID',
    component: AlarmaRangosComponent
  },
  {
    path: 'alarma-abm',
    component: AlarmaAbmComponent
  },
  {
    path: 'alarma-view',
    component: AlarmaViewComponent
  },
];
