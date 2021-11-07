import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
import { CampoEditComponent } from './campo/campo-edit/campo-edit.component';
import { CampoViewComponent } from './campo/campo-view/campo-view.component';
import { CampoDeleteComponent } from './campo/campo-delete/campo-delete.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import { SilobolsaListComponent } from './silobolsa/silobolsa-list/silobolsa-list.component';
import { SilobolsaAbmComponent } from './silobolsa/silobolsa-abm/silobolsa-abm.component';
import { ProductorListComponent } from './productor/productor-list/productor-list.component';
import { ProductorAbmComponent } from './productor/productor-abm/productor-abm.component';
import { ProductorViewComponent } from './productor/productor-view/productor-view.component';
import { DispositivoListComponent } from './dispositivo/dispositivo-list/dispositivo-list.component';
import { DispositivoAbmComponent } from './dispositivo/dispositivo-abm/dispositivo-abm.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { HistoricoAlarmaListComponent } from './historicoalarma/historicoalarma-list.component';
import { TableroComponent } from './tablero/tablero.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { DispositivoEstadoActualComponent } from './dispositivo/dispositivo-estado-actual/dispositivo-estado-actual.component';
import { ChartistModule } from 'ng-chartist';
import { SilobolsaEstadoActualComponent } from './silobolsa/silobolsa-estado-actual/silobolsa-estado-actual.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    GoogleMapsModule,
    ChartistModule,
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
    CampoViewComponent,
    CampoEditComponent,
    CampoDeleteComponent,
    UserViewComponent,
    UserDeleteComponent,
    SilobolsaListComponent,
    SilobolsaAbmComponent,
    ProductorListComponent,
    ProductorAbmComponent,
    ProductorViewComponent,
    DispositivoListComponent,
    HistoricoAlarmaListComponent,
    TableroComponent,
    HistoricoAlarmaListComponent,
    DispositivoAbmComponent,
    DispositivoEstadoActualComponent,
    SilobolsaEstadoActualComponent,
  ]
})
export class MaterialComponentsModule {}
