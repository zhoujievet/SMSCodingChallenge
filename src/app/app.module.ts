import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModules} from './material-modules';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { MessagesComponent } from './messages/messages.component';

import { HttpClientModule }    from '@angular/common/http';

import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules
  ],
  providers: [
    //use UTC Time in this application
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
