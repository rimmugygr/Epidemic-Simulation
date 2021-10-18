import { Injectable } from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {
  CreateSimulation,
  DeleteSimulation,
  FetchSimulations,
  UpdateSimulation
} from './simulation.actions';
import {Simulation} from "../../model/simulation.model";
import {SimulationService} from "../../services/simulation.service";
import {tap} from "rxjs/operators";
import {insertItem, patch, removeItem, updateItem} from "@ngxs/store/operators";

export interface SimulationStateModel {
  simulations: Simulation[];
  recentlyAddedSimulations: Simulation[];
  recentlyUpdatedSimulations: Simulation[];
  recentlyDeletedSimulations: Simulation[];
}

@State<SimulationStateModel>({
  name: 'simulation',
  defaults: {
    simulations: [],
    recentlyAddedSimulations: [],
    recentlyUpdatedSimulations: [],
    recentlyDeletedSimulations: [],
  }
})
@Injectable()
export class SimulationState {

  @Selector()
  public static getSimulations(state: SimulationStateModel): Simulation[] {
    return state.simulations;
  }

  @Selector()
  public static getSimulationById(state: SimulationStateModel): (id: number) => Simulation {
    return (id: number): Simulation => {
      return state.simulations.find(Simulation => Simulation.id === id);
    };
  }

  @Selector()
  public static getRecentlyAddedSimulations(state: SimulationStateModel): Simulation[] {
    return state.recentlyAddedSimulations;
  }

  @Selector()
  public static getRecentlyUpdatedSimulations(state: SimulationStateModel): Simulation[] {
    return state.recentlyUpdatedSimulations;
  }

  @Selector()
  public static getRecentlyDeletedSimulations(state: SimulationStateModel): Simulation[] {
    return state.recentlyDeletedSimulations;
  }

  constructor(private service: SimulationService) { }

  @Action(FetchSimulations)
  public fetchEmployees(ctx: StateContext<SimulationStateModel>): any {

    return this.service.getAllSimulations().pipe(
      tap(response => {
        ctx.patchState({ simulations: response });
      }),
    );
  }

  @Action(CreateSimulation)
  public createEmployee(ctx: StateContext<SimulationStateModel>, { payload }: CreateSimulation): any {

    return this.service.postStudent(payload.simulation).pipe(
      tap(response => {
        ctx.setState(patch({ simulations: insertItem(response) }));
      }),
    );
  }

  @Action(UpdateSimulation)
  public updateEmployee(ctx: StateContext<SimulationStateModel>, { payload }: UpdateSimulation): any {

    return this.service.putStudent(payload.simulation).pipe(
      tap(response => {
        ctx.setState(patch({ simulations: updateItem(emp => emp.id === response.id, response) }));
      }),
    );
  }

  @Action(DeleteSimulation)
  public DeleteEmployee(ctx: StateContext<SimulationStateModel>, { payload }: DeleteSimulation): any {

    return this.service.deleteStudent(payload.id).pipe(
      tap(response => {
        ctx.setState(patch({ simulations: removeItem((emp: Simulation) => emp.id === response) }));
      }),
    );
  }


}
