import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../guards/admin.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { AddCategoriesComponent } from './components/add-categories/add-categories.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-products', component: AddProductsComponent },
      { path: 'update-product/:id', component: UpdateProductComponent },
      { path: 'add-categories', component: AddCategoriesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'feedback', component: FeedbackComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
