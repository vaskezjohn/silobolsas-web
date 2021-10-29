import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './silobolsa.routing';

import { SilobolsaMonitorComponent } from './silobolsa-monitor/silobolsa-monitor.component';
import { SilobolsaInfoDialogComponent } from './silobolsa-monitor/silobolsa-info-dialog/silobolsa-info-dialog.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserNewComponent } from './user/user-new/user-new.component';
import { CampoListComponent } from './campo/campo-list/campo-list.component';
import { CampoNewComponent } from './campo/campo-new/campo-new.component';
import { UserViewComponent } from './user/user-view/user-view.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    SilobolsaMonitorComponent,
    SilobolsaInfoDialogComponent,
    UserListComponent,
    UserEditComponent,
    UserNewComponent,
    CampoListComponent,
    CampoNewComponent,
    UserViewComponent,
    UserDeleteComponent
  ]
})
export class MaterialComponentsModule {}
