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
  { state: 'dashboard', name: 'Estadísticas', type: 'link', icon: 'av_timer', userRole: 'AGRO' },
  { state: 'silobolsa-monitor', type: 'link', name: 'Monitoreo', icon: 'view_comfy', userRole: 'AGRO' },
  { state: 'productor-list', type: 'link', name: 'Productores', icon: 'supervisor_account', userRole: 'ADMIN' },
  { state: 'user-list', type: 'link', name: 'Usuarios', icon: 'view_list', userRole: 'ADMIN' },
  { state: 'campo-list', type: 'link', name: 'Campos', icon: 'terrain', userRole: 'AGRO' },
  { state: 'silobolsa-list', type: 'link', name: 'Silobolsas', icon: 'grain', userRole: 'AGRO' },
  { state: 'dispositivo-list', type: 'link', name: 'Dispositivos', icon: 'settings_remotenna', userRole: 'AGRO' },
  { state: 'historicoalarma-list', type: 'link', name: 'Alertas', icon: 'alarm', userRole: 'AGRO' },
  { state: 'tablero', type: 'link', name: 'Alertas', icon: 'alarm', userRole: 'AGRO' }


];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
