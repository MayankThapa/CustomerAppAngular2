import { NgModule } from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { BillingComponent } from './billing/billing.component';
 
 const routes: Routes = [
  {
    path: '',
    component: CustomerComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'billing',
    component: BillingComponent
  }
 ];
 
 export const routing: ModuleWithProviders = RouterModule.forRoot(routes);