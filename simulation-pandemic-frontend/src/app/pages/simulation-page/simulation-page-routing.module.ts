import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SimulationListPageComponent} from "./component/simulation-list-page/simulation-list-page.component";
import {SimulationDetailPageComponent} from "./component/simulation-detail-page/simulation-detail-page.component";

const routes: Routes = [
  { path: ``, component: SimulationListPageComponent },
  { path: `:id/details`, component: SimulationDetailPageComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulationPageRoutingModule { }
