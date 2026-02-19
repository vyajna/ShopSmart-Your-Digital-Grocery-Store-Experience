import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: MyCartComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'place-order', component: PlaceOrderComponent, canActivate: [AuthGuard] },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
