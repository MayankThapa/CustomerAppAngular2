import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
//Components
import { AppComponent } from './app.component';
import { CustomerComponent, AddCustomerComponent, EditCustomerComponent, AddressComponent } from './customer/customer.component';
import { BillingComponent } from './billing/billing.component';


@NgModule({

  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    MatDialogModule,
    MatFormFieldModule

  ],
  declarations: [
    AppComponent,
    BillingComponent,
    CustomerComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    AddressComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddCustomerComponent, EditCustomerComponent]
})
export class AppModule { }
