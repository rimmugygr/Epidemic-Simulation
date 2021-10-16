import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
    this.simulationForm = this.fb.group({
      id: [null, {disabled: true}],
      name: [null, Validators.required],
      population: [null, Validators.required],
      initInfected: [null, Validators.required],
      reproduction: [null, Validators.required],
      mortality: [null, Validators.required],
      daysToRecover: [null, Validators.required],
      daysToDeath: [null, Validators.required],
      daysOfSimulation: [null, Validators.required],
    });

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
          console.error('request errored:', error);
        },
        () => { console.log('request completed'); },
      );
    } else {
      console.log('not ready to save', this.simulationForm.value);
    }
  }

  update(): void {
    this.store.dispatch(new UpdateSimulation({ simulation: this.simulationForm.value }));
  }

  delete(): void {
    this.store.dispatch(new DeleteSimulation({ id: this.simulationForm.value.id }));
  }

  goBack(): void {
    this.location.back();
  }

  ifRequired(value: string): boolean {
    const field = this.simulationForm.get(value);

    return this.showErrors ? field.errors?.required : field.touched && field.errors?.required;
  }

  getPageModeCamelCase(): string {
    return this.pageMode.formMode;
  }



}
