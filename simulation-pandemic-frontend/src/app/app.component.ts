import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {Alert} from "./shared/model/alert.model";
import {UiState} from "./shared/state/ui/ui.state";
import {SetErrorAlert, SetSuccessAlert} from "./shared/state/ui/ui.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simulation-pandemic-frontend';

  @Select(UiState.getSuccessAlert) successAlert$: Observable<Alert>;
  @Select(UiState.getErrorAlert) errorAlert$: Observable<Alert>;

  constructor(private store: Store) { }

  hideSuccessAlert(): void {
    this.store.dispatch(new SetSuccessAlert({ successAlert: { show: false } }));
  }

  hideErrorAlert(): void {
    this.store.dispatch(new SetErrorAlert({ errorAlert: { show: false } }));
  }

}
