import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Estadísticas', type: 'link', icon: 'av_timer' },
  { state: 'silobolsa-monitor', type: 'link', name: 'Monitoreo', icon: 'view_comfy' },
  { state: 'user-list', type: 'link', name: 'Usuario', icon: 'view_list' }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
