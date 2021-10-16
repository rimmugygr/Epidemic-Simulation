import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {HomePageModule} from "./pages/home-page/home-page.module";
import {SimulationPageModule} from "./pages/simulation-page/simulation-page.module";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {environment} from "../environments/environment";
import {StateClass} from "@ngxs/store/internals";
import {NgxsStoragePluginModule, StorageOption} from "@ngxs/storage-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {SimulationState} from "./shared/state/simulations/simulation.state";

const persistentStates: StateClass<any>[] = [SimulationState];
const states: StateClass<any>[] = [...persistentStates,]// GeneratedSimulationState];

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
    SimulationPageModule,
    NgxsModule.forRoot(states, {developmentMode: !environment.production}),
    NgxsStoragePluginModule.forRoot({ key: persistentStates, storage: StorageOption.LocalStorage}),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
