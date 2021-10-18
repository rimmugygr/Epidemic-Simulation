import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import {GeneratedSimulationDay} from "../../model/simulation.model";

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
  // @Action(GeneratedSimulationAction)
  // add({ getState, setState }: StateContext<GeneratedSimulationStateModel>, { payload }: GeneratedSimulationAction) {
  //   const state = getState();
  //   setState({ items: [ ...state.items, payload ] });
  // }
}
