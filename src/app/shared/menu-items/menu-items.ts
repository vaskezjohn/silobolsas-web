import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  userRole: string,
  hasPermissions?: boolean
}

const MENUITEMS = [
  { state: 'estadisticas', name: 'Estadísticas', type: 'link', icon: 'av_timer', userRole: 'AGRO|AGRO-ADMIN' },
  { state: 'tablero', type: 'link', name: 'Monitoreo', icon: 'view_comfy', userRole: 'AGRO|AGRO-ADMIN' },
  { state: 'productor-list', type: 'link', name: 'Productores', icon: 'supervisor_account', userRole: 'ADMIN' },
  { state: 'user-list', type: 'link', name: 'Usuarios', icon: 'view_list', userRole: 'ADMIN|AGRO-ADMIN' },
  { state: 'grano-list', type: 'link', name: 'Granos', icon: 'spa', userRole: 'ADMIN' },
  { state: 'campo-list', type: 'link', name: 'Campos', icon: 'terrain', userRole: 'AGRO|AGRO-ADMIN' },
  { state: 'silobolsa-list', type: 'link', name: 'Silobolsas', icon: 'grain', userRole: 'AGRO|AGRO-ADMIN' },
  { state: 'dispositivo-list', type: 'link', name: 'Dispositivos', icon: 'settings_remotenna', userRole: 'AGRO|AGRO-ADMIN' },
  { state: 'historicoalarma-list', type: 'link', name: 'Alertas', icon: 'alarm', userRole: 'AGRO|AGRO-ADMIN' },
  { state: 'alarma-list', type: 'link', name: 'Alarmas', icon: 'traffic', userRole: 'AGRO|AGRO-ADMIN' }

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
