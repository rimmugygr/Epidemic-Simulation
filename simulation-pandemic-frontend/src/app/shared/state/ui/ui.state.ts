import { Injectable } from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {SetErrorAlert, SetSuccessAlert} from './ui.actions';
import {Alert} from "../../model/alert.model";

export class UiStateModel {
  successAlert: Alert;
  errorAlert: Alert;
}

@State<UiStateModel>({
  name: 'ui',
  defaults: {
    successAlert: { show: false },
    errorAlert: { show: false },
  }
})

@Injectable()
export class UiState {

  @Selector()
  public static getSuccessAlert(state: UiStateModel): Alert {
    return state.successAlert;
  }

  @Selector()
  public static getErrorAlert(state: UiStateModel): Alert {
    return state.errorAlert;
  }


  @Action(SetSuccessAlert)
  public setSuccessAlert(ctx: StateContext<UiStateModel>, { payload }: SetSuccessAlert): any {
    ctx.patchState({ successAlert: payload.successAlert });
  }

  @Action(SetErrorAlert)
  public setErrorAlert(ctx: StateContext<UiStateModel>, { payload }: SetErrorAlert): any {
    ctx.patchState({ errorAlert: payload.errorAlert });
  }

}
