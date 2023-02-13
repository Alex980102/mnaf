import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule, ReactiveFormsModule]
})
export class PagesModule {}
