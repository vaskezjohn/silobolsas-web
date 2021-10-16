import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { SilobolsaMonitorComponent } from './silobolsa-monitor/silobolsa-monitor.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';

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
