import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SlimScrollModule } from 'ng2-slimscroll';

import { DatePickerComponent } from './ng2-datepicker.component';
import {Ng2DeviceDetector} from "ng2-device-detector";
export { DatePickerOptions, DateModel } from './ng2-datepicker.component';

@NgModule({
  declarations: [
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SlimScrollModule,
    Ng2DeviceDetector
  ],
  exports: [
    DatePickerComponent,
    SlimScrollModule,
    FormsModule
  ]
})
export class DatePickerModule { }
