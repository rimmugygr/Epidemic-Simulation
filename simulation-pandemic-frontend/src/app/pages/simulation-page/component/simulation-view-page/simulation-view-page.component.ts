import { Component, OnInit } from '@angular/core';
import {Simulation} from "../../../../shared/model/simulation.model";
import {SimulationState} from "../../../../shared/state/simulations/simulation.state";
import {Select, Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-simulation-detail-page',
  templateUrl: './simulation-view-page.component.html',
  styleUrls: ['./simulation-view-page.component.css']
})
export class SimulationViewPageComponent implements OnInit {
  simulation: Simulation;

  constructor(private store: Store,
              private route: ActivatedRoute) {


  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.simulation = this.store.selectSnapshot(SimulationState.getSimulationById)(+id);
  }

}
