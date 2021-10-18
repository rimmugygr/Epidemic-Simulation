import {APP_INITIALIZER, NgModule} from '@angular/core';

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
import {AlertHandler} from "./shared/handler/alert.handler";
import {UiState} from "./shared/state/ui/ui.state";
import {RouteHandler} from "./shared/handler/route.handler";
import {GeneratedSimulationState} from "./shared/state/generated-simulation/generated-simulation.state";
import {ChartModule} from "smart-webcomponents-angular/chart";

const persistentStates: StateClass<any>[] = [SimulationState];
const states: StateClass<any>[] = [...persistentStates,UiState, GeneratedSimulationState];

const initFn = () => () => { /* use for some initialization stuff */ };

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
    ChartModule,
    NgxsModule.forRoot(states, {developmentMode: !environment.production}),
    NgxsStoragePluginModule.forRoot({ key: persistentStates, storage: StorageOption.LocalStorage}),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initFn,
      deps: [RouteHandler, AlertHandler],
      multi: true
    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
