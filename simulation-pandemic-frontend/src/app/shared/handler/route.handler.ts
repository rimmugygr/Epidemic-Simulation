import { Injectable } from '@angular/core';
import {Actions, ofActionSuccessful} from "@ngxs/store";
import { Location } from '@angular/common';
import {CreateSimulation, DeleteSimulation, UpdateSimulation} from "../state/simulations/simulation.actions";

@Injectable({
  providedIn: 'root'
})
export class RouteHandler {

  constructor(
    private actions$: Actions,
    private location: Location,
  ) {

    // go back if simulation Create, Update, Delete success
    this.actions$.pipe(ofActionSuccessful(CreateSimulation, UpdateSimulation, DeleteSimulation)).subscribe(result => {
      this.location.back();
    });
  }

}
