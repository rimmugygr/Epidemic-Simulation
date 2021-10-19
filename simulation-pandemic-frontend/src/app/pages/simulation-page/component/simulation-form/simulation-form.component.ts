import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {FORM_MODE} from "../../../../shared/model/form-mode.model";
import {Simulation} from "../../../../shared/model/simulation.model";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngxs/store";
import {getPageMode} from "../../../../shared/utils/utils";
import {PageMode} from "../../../../shared/model/page-mode.model";
import {SimulationState} from "../../../../shared/state/simulations/simulation.state";
import {
  CreateSimulation,
  DeleteSimulation,
  UpdateSimulation
} from "../../../../shared/state/simulations/simulation.actions";
import { Location } from '@angular/common';
import {SetErrorAlert} from "../../../../shared/state/ui/ui.actions";

@Component({
  selector: 'app-simulation-form',
  templateUrl: './simulation-form.component.html',
  styleUrls: ['./simulation-form.component.css']
})
 export class SimulationFormComponent implements OnInit {
  pageMode: PageMode;
  simulations: Simulation;
  simulationId: number;
  simulationForm: FormGroup;

  showErrors = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.pageMode = getPageMode(this.route);
    this.initForm();
  }

  private initForm(): void {
    this.simulationForm = this.fb.group(
      {
        id: [null, {disabled: true}],
        name: [null, Validators.required],
        population: [null,
          [Validators.required, Validators.min(1), Validators.pattern("^([+-]?[0-9]*|0)$")]],
        initInfected: [null,
          [Validators.required, Validators.min(1), Validators.pattern("^([+-]?[0-9]*|0)$")]],
        reproduction: [null,
          [Validators.required, Validators.min(0), Validators.pattern("^([+-]?[0-9]*|0)$")]],
        mortality: [null,
          [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^([+-]?[0-9]*|0)$")]],
        daysToRecover: [null,
          [Validators.required, Validators.min(0), Validators.pattern("^([+-]?[0-9]*|0)$")]],
        daysToDeath: [null,
          [Validators.required, Validators.min(0), Validators.pattern("^([+-]?[0-9]*|0)$")]],
        daysOfSimulation: [null,
          [Validators.required, Validators.min(0), Validators.max(200), Validators.pattern("^([+-]?[0-9]*|0)$")]]
      },
      { validator: this.matchPopulationAndInitInfected });

    if (this.pageMode.formMode !== FORM_MODE.CREATE) {
      const simulation = this.store.selectSnapshot(SimulationState.getSimulationById)(+this.pageMode.id);
      this.simulationForm.patchValue(simulation);
    }

    if (this.pageMode.formMode === FORM_MODE.DETAILS) {
      this.simulationForm.disable();
    }
  }


  save(): void {
    this.showErrors = true;

    if (!this.simulationForm.invalid) {
      console.log('ready to save', this.simulationForm.value);

      this.store.dispatch(new CreateSimulation({ simulation: this.simulationForm.value })).subscribe(
        success => {
          console.log('request success', success);
        },
        error => {
          this.store.dispatch(new SetErrorAlert({
            errorAlert: {
              show: true, text: error.error, length: 5 * 1000
            }
          }));
          console.error('request errored:', error.error);
        },
        () => { console.log('request completed'); },
      );
    } else {
      console.log('not ready to save', this.simulationForm.value);
    }
  }

  update(): void {
    this.showErrors = true;

    if (!this.simulationForm.invalid) {
      console.log('ready to update', this.simulationForm.value);

      this.store.dispatch(new UpdateSimulation({ simulation: this.simulationForm.value })).subscribe(
        success => {
          console.log('request success', success);
        },
        error => {
          this.store.dispatch(new SetErrorAlert({
            errorAlert: {
              show: true, text: error.error, length: 5 * 1000
            }
          }));
          console.error('request errored:', error.error);
        },
        () => { console.log('request completed'); },
    );
    } else {
      console.log('not ready to update', this.simulationForm.value);
    }
  }

  delete(): void {
    this.store.dispatch(new DeleteSimulation({ id: this.simulationForm.value.id }));
  }

  goBack(): void {
    this.location.back();
  }


  matchPopulationAndInitInfected(control: AbstractControl): ValidationErrors | null {
    const population = control.get("population").value;
    const initInfected = control.get("initInfected").value;
    if (population < initInfected) { return { 'noMatch': true } }
    return null
  }

  getPageModeCamelCase(): string {
    return this.pageMode.formMode.toUpperCase().charAt(0) + this.pageMode.formMode.toLowerCase().substring(1);
  }



}
