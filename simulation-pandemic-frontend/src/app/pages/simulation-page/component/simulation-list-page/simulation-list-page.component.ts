import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {SimulationState} from "../../../../shared/state/simulations/simulation.state";
import {Simulation} from "../../../../shared/model/simulation.model";
import {FetchSimulations} from "../../../../shared/state/simulations/simulation.actions";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-simulation-list-page',
  templateUrl: './simulation-list-page.component.html',
  styleUrls: ['./simulation-list-page.component.css']
})
export class SimulationListPageComponent implements OnInit {
  icons = {
    faPlus,
  };

  @Select(SimulationState.getSimulations) simulations$: Observable<Simulation[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new FetchSimulations());
  }
}
