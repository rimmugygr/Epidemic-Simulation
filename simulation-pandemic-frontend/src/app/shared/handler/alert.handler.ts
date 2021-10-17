import { Injectable } from '@angular/core';
import {Actions, ofActionDispatched, ofActionErrored, ofActionSuccessful, Store} from "@ngxs/store";
import {SetErrorAlert, SetSuccessAlert} from "../state/ui/ui.actions";
import {interval} from "rxjs";
import {take} from "rxjs/operators";
import {UiState} from "../state/ui/ui.state";
import {CreateSimulation, UpdateSimulation} from "../state/simulations/simulation.actions";

@Injectable({
  providedIn: 'root'
})
export class AlertHandler {
  constructor(
    private actions$: Actions,
    private store: Store,
  ) {
    //for create actions
    this.actions$
      .pipe(ofActionSuccessful(CreateSimulation))
      .subscribe(result => {
        this.store.dispatch(new SetSuccessAlert({
          successAlert: {
            show: true, text: 'Simulation created!', length: 5 * 1000
          }
        }));
      });
    this.actions$
      .pipe(ofActionErrored(CreateSimulation))
      .subscribe(result => {
        this.store.dispatch(new SetErrorAlert({
          errorAlert: {
            show: true, text: 'Simulation not created! Error occurred!', length: 5 * 1000
          }
        }));
      });

    // for update actions
    this.actions$
      .pipe(ofActionSuccessful(UpdateSimulation))
      .subscribe(result => {
        this.store.dispatch(new SetSuccessAlert({
          successAlert: {
            show: true, text: 'Simulation updated!', length: 5 * 1000
          }
        }));
      });

    this.actions$
      .pipe(ofActionErrored(UpdateSimulation))
      .subscribe(result => {
        this.store.dispatch(new SetErrorAlert({
          errorAlert: {
            show: true, text: 'Simulation not updated! Error occurred!', length: 5 * 1000
          }
        }));
      });

    this.actions$
      .pipe(ofActionDispatched(SetSuccessAlert))
      .subscribe((alertChange: SetSuccessAlert) => {
        if (alertChange.payload.successAlert.show) {
          interval(alertChange.payload.successAlert.length).pipe(take(1)).subscribe(() => {
            const currentSuccessAlert = this.store.selectSnapshot(UiState.getSuccessAlert);
            if (currentSuccessAlert.show) {
              this.store.dispatch(new SetSuccessAlert({ successAlert: { show: false } }));
            }
          });
        }
      });

    this.actions$
      .pipe(ofActionDispatched(SetErrorAlert))
      .subscribe((alertChange: SetErrorAlert) => {
        if (alertChange.payload.errorAlert.show) {
          interval(alertChange.payload.errorAlert.length).pipe(take(1)).subscribe(() => {
            const currentErrorAlert = this.store.selectSnapshot(UiState.getErrorAlert);
            if (currentErrorAlert.show) {
              this.store.dispatch(new SetErrorAlert({ errorAlert: { show: false } }));
            }
          });
        }
      });
  }

}
