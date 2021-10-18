import { Injectable } from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {GeneratedSimulationDay, Simulation} from "../../model/simulation.model";
import {CreateSimulation} from "../simulations/simulation.actions";
import {tap} from "rxjs/operators";
import {insertItem, patch} from "@ngxs/store/operators";
import {SimulationStateModel} from "../simulations/simulation.state";
import {FetchGeneratedSimulationById, FetchRegeneratedSimulationById} from "./generated-simulation.actions";
import {SimulationService} from "../../services/simulation.service";
import {GeneratedSimulationService} from "../../services/generated-simulation.service";

export class GeneratedSimulationStateModel {
  generatedSimulation: GeneratedSimulationDay[];
}

@State<GeneratedSimulationStateModel>({
  name: 'generatedSimulation',
  defaults: {
    generatedSimulation: []
  }
})
@Injectable()
export class GeneratedSimulationState {

  @Selector()
  public static getGeneratedSimulation(state: GeneratedSimulationStateModel): GeneratedSimulationDay[] {
    return state.generatedSimulation;
  }

  constructor(private service: GeneratedSimulationService) { }

  @Action(FetchGeneratedSimulationById)
  public fetchGeneratedSimulationById(ctx: StateContext<GeneratedSimulationStateModel>, { payload }: FetchGeneratedSimulationById): any {
    return this.service.getGeneratedSimulation(payload.id).pipe(
      tap(response => {
        ctx.patchState({ generatedSimulation: response });
      }),
    );
  }

  @Action(FetchRegeneratedSimulationById)
  public fetchRegeneratedSimulationById(ctx: StateContext<GeneratedSimulationStateModel>, { payload }: FetchRegeneratedSimulationById): any {
    return this.service.getRegeneratedSimulation(payload.id).pipe(
      tap(response => {
        ctx.patchState({ generatedSimulation: response });
      }),
    );
  }
}
