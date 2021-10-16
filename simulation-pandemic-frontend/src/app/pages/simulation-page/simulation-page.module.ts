import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SimulationDetailPageComponent} from "./component/simulation-detail-page/simulation-detail-page.component";
import {SimulationListPageComponent} from "./component/simulation-list-page/simulation-list-page.component";
import {SimulationPageRoutingModule} from "./simulation-page-routing.module";
import { SimulationFormComponent } from './component/simulation-form/simulation-form.component';
import {SharedModule} from "../../shared/shared.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    SimulationListPageComponent,
    SimulationDetailPageComponent,
    SimulationFormComponent
  ],
  imports: [
    SimulationPageRoutingModule,
    CommonModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class SimulationPageModule { }
