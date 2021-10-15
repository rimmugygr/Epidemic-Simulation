import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NotFoundPageComponent} from "./shared/component/not-found-page/not-found-page.component";

const routes: Routes = [
  {
    path: `home`,
    loadChildren: () => import('./pages/home-page/home-page.module')
      .then(m => m.HomePageModule),
  },
  {
    path: 'simulation',
    loadChildren: () => import('./pages/simulation-page/simulation-page.module')
      .then(m => m.SimulationPageModule),
  },
  {
    path: ``,
    redirectTo: `home`,
    pathMatch: `full`
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
