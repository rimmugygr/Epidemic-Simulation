import {Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder = '';
  @Input() form: FormGroup;
  @Input() showErrors: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  ifRequired(value: string): boolean {
    const field = this.form.get(value);

    return this.showErrors ? field.errors?.required : field.touched && field.errors?.required;
  }


}
