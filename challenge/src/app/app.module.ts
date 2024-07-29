import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NewUserComponent } from './components/new-user/new-user.component';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgCharts } from 'ag-charts-angular';
import { VisualizeViewComponent } from './components/visualize-view/visualize-view.component';
import { BarComponent } from './components/visualize-view/bar/bar.component';
import { LineComponent } from './components/visualize-view/line/line.component';
import { PieComponent } from './components/visualize-view/pie/pie.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffects } from './store/effects/user.effects';
import { userReducer } from './store/reducers/user.reducer';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    NewUserComponent,
    VisualizeViewComponent,
    BarComponent,
    LineComponent,
    PieComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgGridAngular,
    AgCharts,
    NgChartsModule,
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
