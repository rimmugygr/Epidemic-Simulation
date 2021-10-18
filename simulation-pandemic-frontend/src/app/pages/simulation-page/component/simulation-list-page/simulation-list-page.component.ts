import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {combineLatest, Observable} from "rxjs";
import {SimulationState} from "../../../../shared/state/simulations/simulation.state";
import {Simulation} from "../../../../shared/model/simulation.model";
import {FetchSimulations} from "../../../../shared/state/simulations/simulation.actions";
import {faPlus, faEdit, faBookOpen} from "@fortawesome/free-solid-svg-icons";
import {map} from "rxjs/operators";
import {ListActionsService} from "../../../../shared/services/list-actions.service";

@Component({
  selector: 'app-simulation-list-page',
  templateUrl: './simulation-list-page.component.html',
  styleUrls: ['./simulation-list-page.component.css']
})
export class SimulationListPageComponent implements OnInit {
  icons = {
    faPlus,
    faEdit,
    faBookOpen
  };

  page = 1;
  pageSize = 5;
  collectionSize : number;

  @Select(SimulationState.getSimulations) simulations$: Observable<Simulation[]>;
  simulationsSearch$: Observable<Simulation[]>;
  simulationsPaginated$:  Observable<Simulation[]>;

  constructor(private store: Store,
              private pagination: ListActionsService) { }

  ngOnInit(): void {
    this.store.dispatch(new FetchSimulations());

    this.simulationsSearch$ = combineLatest([this.simulations$, this.pagination.filterAction$])
      .pipe(
        map(([simulations, search]) => {
          this.page = 1;
          if(search == null || search =='') return  simulations;
          return simulations.filter(x => x.name.trim().toLowerCase().includes(search.trim().toLowerCase()));
        })
      );

    this.simulationsPaginated$ = combineLatest([this.simulationsSearch$, this.pagination.pageChange$]).pipe(
      map(x => x[0]),
      map((country) =>
        country.map((x, i) => {
          this.collectionSize = i;
          return ({id: i, simulation: x});
        })
      ),
      map(x =>
        x.filter(simulation => (this.page - 1) * this.pageSize <= simulation.id && ((this.page - 1) * this.pageSize + this.pageSize - 1) >= simulation.id)
      ),
      map((simulationList) => simulationList.map(({id: i, simulation: x}) => x)
      )
    )
  }

  refresh() {
    this.pagination.emmitPageAction();
  }

  refreshPageSize() {
    this.page = 1;
    this.refresh();
  }

  onTextFilter(text: string): void {
    this.pagination.emmitFilterAction(text);
  }
}
