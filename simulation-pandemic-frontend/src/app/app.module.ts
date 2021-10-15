import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {HomePageModule} from "./pages/home-page/home-page.module";
import {SimulationPageModule} from "./pages/simulation-page/simulation-page.module";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { SimulationDetailPageComponent } from './pages/simulation-page/component/simulation-detail-page/simulation-detail-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SimulationDetailPageComponent,
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
