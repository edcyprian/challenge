import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { VisualizeViewComponent } from './components/visualize-view/visualize-view.component';

const routes: Routes = [
  { path: 'table', component: UsersListComponent },
  { path: 'visual', component: VisualizeViewComponent },
  { path: '', redirectTo: '/table', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
