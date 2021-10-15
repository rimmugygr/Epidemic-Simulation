import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {HomePageModule} from "./pages/home-page/home-page.module";
import {SimulationPageModule} from "./pages/simulation-page/simulation-page.module";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    SharedModule,
    HomePageModule,
    SimulationPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
