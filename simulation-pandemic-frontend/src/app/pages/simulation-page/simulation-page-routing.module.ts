import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SimulationListPageComponent} from "./component/simulation-list-page/simulation-list-page.component";
import {SimulationViewPageComponent} from "./component/simulation-view-page/simulation-view-page.component";
import {SimulationFormComponent} from "./component/simulation-form/simulation-form.component";
import {NotFoundPageComponent} from "../../shared/component/not-found-page/not-found-page.component";

const routes: Routes = [
  { path: `view/:id`, component: SimulationViewPageComponent },
  { path: 'create', component: SimulationFormComponent },
  { path: 'edit', component: NotFoundPageComponent },
  { path: 'edit/:id', component: SimulationFormComponent },
  { path: ':id', component: SimulationFormComponent },
  { path: ``, component: SimulationListPageComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulationPageRoutingModule { }
