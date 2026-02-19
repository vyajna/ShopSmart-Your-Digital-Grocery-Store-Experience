import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { AddCategoriesComponent } from './components/add-categories/add-categories.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddProductsComponent,
    AddCategoriesComponent,
    OrdersComponent,
    FeedbackComponent,
    AdminDashboardComponent,
    UpdateProductComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
