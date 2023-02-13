import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      // Admin Path
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      {
        path: 'inicio',
        component: DashboardComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'inicio' },
      },
      // {
      //   path: 'promotores',
      //   component: PromotoresComponent,
      //   canActivate: [AdminGuard],
      //   data: { titulo: 'inicio' },
      // },
      // Admin Path
      // { path: '', component: DashboardComponent },
      // CreatePromotorGuard
      // CreatePromotorGuard

      // PromotorGuard
      // PromotorGuard
      // { path: 'promotores', component: PromotoresComponent },
      // { path: 'eventos', component: EventosComponent },
      // { path: 'mapas', component: MapasComponent },
      // { path: 'reportes', component: ReportesComponent },
      // { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      // { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
