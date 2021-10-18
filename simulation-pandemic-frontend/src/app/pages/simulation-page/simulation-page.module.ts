import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SimulationViewPageComponent} from "./component/simulation-view-page/simulation-view-page.component";
import {SimulationListPageComponent} from "./component/simulation-list-page/simulation-list-page.component";
import {SimulationPageRoutingModule} from "./simulation-page-routing.module";
import { SimulationFormComponent } from './component/simulation-form/simulation-form.component';
import {SharedModule} from "../../shared/shared.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {ChartModule} from "smart-webcomponents-angular/chart";



@NgModule({
  declarations: [
    SimulationListPageComponent,
    SimulationViewPageComponent,
    SimulationFormComponent
  ],
    imports: [
        SimulationPageRoutingModule,
        CommonModule,
        SharedModule,
        FontAwesomeModule,
        FormsModule,
        ChartModule
    ]
})
export class SimulationPageModule { }
