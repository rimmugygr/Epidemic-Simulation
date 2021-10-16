import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FORM_MODE} from "../../../../shared/model/form-mode.model";
import {SimulationService} from "../../../../shared/services/simulation.service";
import {Simulation} from "../../../../shared/model/simulation.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-simulation-form',
  templateUrl: './simulation-form.component.html',
  styleUrls: ['./simulation-form.component.css']
})
export class SimulationFormComponent implements OnInit {
  @Input() pageMode: FORM_MODE;
  @Input() simulations: Simulation;
  @Input() simulationId: number;
  hide = true;
  form: FormGroup;
  message = '';

  constructor(public modal: NgbActiveModal,
              private simulationService: SimulationService) { }

  ngOnInit(): void {
    this.initForm();
  }

  submitForm(): void {
    if (this.isDeleteMode()) {
      // this.store.dispatch(new DeleteStudent({student: this.form.getRawValue()}));
    }
    if (this.form.valid) {
      if (this.isCreateMode()) {
        // this.store.dispatch(new CreateStudent({student: this.form.value}));
        this.modal.close();
      }
      if (this.isEditMode()) {
        // this.store.dispatch(new UpdateStudent({student: this.form.getRawValue()}));
        this.modal.close();
      }
    } else {
      this.message = 'Pleas fill all form !';
    }
  }

  private initForm(): void {
    this.form = new FormGroup({
      id: new FormControl({value: null, disabled: true}),
      name: new FormControl(null, Validators.required),
      population: new FormControl(null, Validators.required),
      initInfected: new FormControl(null, Validators.required),
      reproduction: new FormControl(null, Validators.required),
      mortality: new FormControl(null, Validators.required),
      daysToRecover: new FormControl(null, Validators.required),
      daysToDeath: new FormControl(null, Validators.required),
      daysOfSimulation: new FormControl(null, Validators.required)
    });





    if (this.isEditMode() || this.isDetailsMode() || this.isDeleteMode()) {
      // this.student = this.store.selectSnapshot(ProfilesStudentsListState.getStudentById)(this.studentId);
      // this.form.patchValue({...this.student});
    }
    if (this.isDetailsMode()) {
      this.form.disable();
    }
  }

  isEditMode(): boolean {
    return this.pageMode === FORM_MODE.EDIT;
  }

  isDetailsMode(): boolean {
    return this.pageMode === FORM_MODE.DETAILS;
  }

  isCreateMode(): boolean {
    return this.pageMode === FORM_MODE.CREATE;
  }

  isDeleteMode(): boolean {
    return this.pageMode === FORM_MODE.DELETE;
  }
}
