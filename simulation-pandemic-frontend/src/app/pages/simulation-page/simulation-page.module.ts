import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SimulationDetailPageComponent} from "./component/simulation-detail-page/simulation-detail-page.component";
import {SimulationListPageComponent} from "./component/simulation-list-page/simulation-list-page.component";



@NgModule({
  declarations: [
    SimulationListPageComponent,
    SimulationDetailPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SimulationPageModule { }
