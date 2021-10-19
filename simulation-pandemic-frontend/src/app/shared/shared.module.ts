import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotFoundPageComponent} from "./component/not-found-page/not-found-page.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { TextInputComponent } from './component/text-input/text-input.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ZeroToNumberPipe } from './pipe/zero-to-number.pipe';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    NotFoundPageComponent,
    TextInputComponent,
    ZeroToNumberPipe
  ],
    imports: [
        NgbModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
    ],
    exports: [
        ReactiveFormsModule,
        NgbModule,
        NotFoundPageComponent,
        TextInputComponent,
        ZeroToNumberPipe
    ]
})
export class SharedModule { }
