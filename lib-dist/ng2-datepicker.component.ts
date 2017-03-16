import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  forwardRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SlimScrollOptions } from 'ng2-slimscroll';
import * as moment from 'moment';
import {Device} from "ng2-device-detector";

const Moment: any = (<any>moment).default || moment;

export interface IDateModel {
  day: string;
  month: string;
  year: string;
  formatted: string;
  momentObj: moment.Moment;
}

export class DateModel {
  day: string;
  month: string;
  year: string;
  formatted: string;
  momentObj: moment.Moment;

  constructor(obj?: IDateModel) {
    this.day = obj && obj.day ? obj.day : null;
    this.month = obj && obj.month ? obj.month : null;
    this.year = obj && obj.year ? obj.year : null;
    this.formatted = obj && obj.formatted ? obj.formatted : null;
    this.momentObj = obj && obj.momentObj ? obj.momentObj : null;
  }
}

export interface IDatePickerOptions {
  autoApply?: boolean;
  style?: 'normal' | 'big' | 'bold';
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  initialDate?: Date;
  firstWeekdaySunday?: boolean;
  format?: string;
}

export class DatePickerOptions {
  autoApply?: boolean;
  style?: 'normal' | 'big' | 'bold';
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  initialDate?: Date;
  firstWeekdaySunday?: boolean;
  format?: string;

  constructor(obj?: IDatePickerOptions) {
    this.autoApply = (obj && obj.autoApply === true) ? true : false;
    this.style = obj && obj.style ? obj.style : 'normal';
    this.locale = obj && obj.locale ? obj.locale : 'en';
    this.minDate = obj && obj.minDate ? obj.minDate : null;
    this.maxDate = obj && obj.maxDate ? obj.maxDate : null;
    this.initialDate = obj && obj.initialDate ? obj.initialDate : null;
    this.firstWeekdaySunday = obj && obj.firstWeekdaySunday ? obj.firstWeekdaySunday : false;
    this.format = obj && obj.format ? obj.format : 'YYYY-MM-DD';
  }
}

export interface CalendarDate {
  day: number;
  month: number;
  year: number;
  enabled: boolean;
  today: boolean;
  selected: boolean;
  momentObj: moment.Moment;
}

export const CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};


@Component({
  selector: 'ng2-datepicker',
  template: `<div class="datepicker-container u-is-unselectable"><div class="datepicker-input-container"><input class="datepicker-input" [(ngModel)]="date.formatted" readonly="readonly"><div class="datepicker-input-icon" (click)="toggle()"><i><svg width="58px" height="58px" viewBox="0 0 58 58" version="1.1"><g id="calendar" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group" fill-rule="nonzero" fill="#000000"><path d="M42.899,4.5 C42.434,2.221 40.415,0.5 38,0.5 C37.447,0.5 37,0.947 37,1.5 C37,2.053 37.447,2.5 38,2.5 C39.654,2.5 41,3.846 41,5.5 C41,7.154 39.654,8.5 38,8.5 C37.447,8.5 37,8.947 37,9.5 C37,10.053 37.447,10.5 38,10.5 C40.414,10.5 42.434,8.779 42.899,6.5 L56,6.5 L56,15.5 L2,15.5 L2,6.5 L16,6.5 L19,6.5 C19.553,6.5 20,6.053 20,5.5 C20,4.947 19.553,4.5 19,4.5 L17.184,4.5 C17.598,3.338 18.698,2.5 20,2.5 C21.654,2.5 23,3.846 23,5.5 C23,7.154 21.654,8.5 20,8.5 C19.447,8.5 19,8.947 19,9.5 C19,10.053 19.447,10.5 20,10.5 C22.757,10.5 25,8.257 25,5.5 C25,2.743 22.757,0.5 20,0.5 C17.586,0.5 15.566,2.221 15.101,4.5 L0,4.5 L0,17.5 L0,57.5 L58,57.5 L58,17.5 L58,4.5 L42.899,4.5 Z M56,55.5 L2,55.5 L2,17.5 L56,17.5 L56,55.5 Z" id="Shape"></path><path d="M26,2.5 C27.654,2.5 29,3.846 29,5.5 C29,7.154 27.654,8.5 26,8.5 C25.447,8.5 25,8.947 25,9.5 C25,10.053 25.447,10.5 26,10.5 C28.757,10.5 31,8.257 31,5.5 C31,2.743 28.757,0.5 26,0.5 C25.447,0.5 25,0.947 25,1.5 C25,2.053 25.447,2.5 26,2.5 Z" id="Shape"></path><path d="M32,2.5 C33.654,2.5 35,3.846 35,5.5 C35,7.154 33.654,8.5 32,8.5 C31.447,8.5 31,8.947 31,9.5 C31,10.053 31.447,10.5 32,10.5 C34.757,10.5 37,8.257 37,5.5 C37,2.743 34.757,0.5 32,0.5 C31.447,0.5 31,0.947 31,1.5 C31,2.053 31.447,2.5 32,2.5 Z" id="Shape"></path><circle id="Oval" cx="22" cy="24.5" r="1"></circle><circle id="Oval" cx="29" cy="24.5" r="1"></circle><circle id="Oval" cx="36" cy="24.5" r="1"></circle><circle id="Oval" cx="43" cy="24.5" r="1"></circle><circle id="Oval" cx="50" cy="24.5" r="1"></circle><circle id="Oval" cx="8" cy="32.5" r="1"></circle><circle id="Oval" cx="15" cy="32.5" r="1"></circle><circle id="Oval" cx="22" cy="32.5" r="1"></circle><circle id="Oval" cx="29" cy="32.5" r="1"></circle><circle id="Oval" cx="36" cy="32.5" r="1"></circle><circle id="Oval" cx="43" cy="32.5" r="1"></circle><circle id="Oval" cx="50" cy="32.5" r="1"></circle><circle id="Oval" cx="8" cy="39.5" r="1"></circle><circle id="Oval" cx="15" cy="39.5" r="1"></circle><circle id="Oval" cx="22" cy="39.5" r="1"></circle><circle id="Oval" cx="29" cy="39.5" r="1"></circle><circle id="Oval" cx="36" cy="39.5" r="1"></circle><circle id="Oval" cx="43" cy="39.5" r="1"></circle><circle id="Oval" cx="50" cy="39.5" r="1"></circle><circle id="Oval" cx="8" cy="47.5" r="1"></circle><circle id="Oval" cx="15" cy="47.5" r="1"></circle><circle id="Oval" cx="22" cy="47.5" r="1"></circle><circle id="Oval" cx="29" cy="47.5" r="1"></circle><circle id="Oval" cx="36" cy="47.5" r="1"></circle></g></g></svg></i></div></div><div class="datepicker-calendar" *ngIf="opened"><div class="datepicker-calendar-top"><span class="year-title">{{ currentDate.format('YYYY') }}</span> <button type="button" (click)="openYearPicker()" *ngIf="!yearPicker"><svg width="494px" height="220px" viewBox="0 137 494 220" version="1.1"><g id="long-arrow-pointing-to-the-right" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(0.000000, 137.000000)"><path d="M490.498,102.278 L380.866,2.349 C377.82,-0.125 374.49,-0.601 370.873,0.922 C367.26,2.447 365.446,5.205 365.446,9.204 L365.446,73.158 L9.136,73.158 C6.47,73.158 4.28,74.013 2.569,75.726 C0.859,77.438 0,79.628 0,82.292 L0,137.108 C0,139.771 0.855,141.961 2.568,143.671 C4.283,145.383 6.473,146.238 9.135,146.238 L365.448,146.238 L365.448,210.191 C365.448,214.003 367.265,216.761 370.876,218.469 C374.496,219.998 377.826,219.42 380.872,216.761 L490.504,115.684 C492.407,113.782 493.356,111.502 493.356,108.835 C493.356,106.367 492.401,104.181 490.498,102.278 Z" id="Shape" fill="#000000" fill-rule="nonzero"></path></g></svg> Select Year</button> <i class="close" (click)="close()"><svg width="350px" height="349px" viewBox="-1 0 350 349" version="1.1"><g id="delete" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M336.559,68.611 L231.016,174.165 L336.559,279.714 C352.258,295.419 352.258,320.859 336.559,336.564 C328.715,344.408 318.431,348.333 308.152,348.333 C297.856,348.333 287.571,344.414 279.733,336.564 L174.167,231.003 L68.609,336.563 C60.766,344.407 50.481,348.332 40.193,348.332 C29.908,348.332 19.63,344.413 11.78,336.563 C-3.919,320.865 -3.919,295.424 11.78,279.713 L117.32,174.164 L11.774,68.611 C-3.925,52.912 -3.925,27.466 11.774,11.767 C27.47,-3.92 52.901,-3.92 68.603,11.767 L174.166,117.321 L279.721,11.767 C295.426,-3.92 320.86,-3.92 336.553,11.767 C352.258,27.466 352.258,52.912 336.559,68.611 Z" id="Shape" fill="#000000" fill-rule="nonzero"></path></g></svg></i></div><div class="datepicker-calendar-container"><div *ngIf="!yearPicker"><div class="datepicker-calendar-month-section"><i (click)="prevMonth()"><svg width="190px" height="306px" viewBox="58 0 190 306" version="1.1"><g id="keyboard-left-arrow-button" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(58.000000, 0.000000)"><g id="chevron-left" fill-rule="nonzero" fill="#000000"><polygon id="Shape" points="189.35 35.7 153.65 0 0.65 153 153.65 306 189.35 270.3 72.05 153"></polygon></g></g></svg> </i><span class="month-title">{{ currentDate.format('MMMM') }}</span> <i (click)="nextMonth()"><svg width="190px" height="306px" viewBox="58 0 190 306" version="1.1"><g id="keyboard-right-arrow-button" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(58.000000, 0.000000)"><g id="chevron-right" fill-rule="nonzero" fill="#000000"><polygon id="Shape" points="36.35 0 0.65 35.7 117.95 153 0.65 270.3 36.35 306 189.35 153"></polygon></g></g></svg></i></div><div class="datepicker-calendar-day-names"><span>S</span> <span>M</span> <span>T</span> <span>W</span> <span>T</span> <span>F</span> <span>S</span></div><div class="datepicker-calendar-days-container"><span class="day" *ngFor="let d of days; let i = index" (click)="selectDate($event, d.momentObj)" [ngClass]="{ 'disabled': !d.enabled, 'today': d.today, 'selected': d.selected }">{{ d.day }}</span></div><div class="datepicker-buttons" *ngIf="!options.autoApply"><button type="button" class="a-button u-is-secondary u-is-small" (click)="clear()">Clear</button> <button type="button" class="a-button u-is-primary u-is-small" (click)="today()">Today</button></div></div><div *ngIf="yearPicker && !isMobile()"><div class="datepicker-calendar-years-container" slimScroll [options]="scrollOptions"><span class="year" *ngFor="let y of years; let i = index" (click)="selectYear($event, y)">{{ y }}</span></div></div><div *ngIf="yearPicker && isMobile()"><div class="datepicker-calendar-years-container" style="overflow-y: auto"><span class="year" *ngFor="let y of years; let i = index" (click)="selectYear($event, y)">{{ y }}</span></div></div></div></div></div>`,
  styles: [`.datepicker-container{display:inline-block;position:relative}.datepicker-container .datepicker-input-container{display:inline-block;background:0 0}.datepicker-container .datepicker-input-container .datepicker-input{display:inline-block;width:160px;margin-right:10px;border:none;outline:none;border-bottom:1px solid #ced4da;font-size:14px;color:#000;text-align:center}.datepicker-container .datepicker-input-container .datepicker-input::-webkit-input-placeholder{color:#343a40}.datepicker-container .datepicker-input-container .datepicker-input::-moz-placeholder{color:#343a40}.datepicker-container .datepicker-input-container .datepicker-input:-ms-input-placeholder{color:#343a40}.datepicker-container .datepicker-input-container .datepicker-input:-moz-placeholder{color:#343a40}.datepicker-container .datepicker-input-container .datepicker-input-icon{display:inline-block}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section i,.datepicker-container .datepicker-input-container .datepicker-input-icon i{cursor:pointer}.datepicker-container .datepicker-input-container .datepicker-input-icon i svg{width:15px;height:15px}.datepicker-container .datepicker-input-container .datepicker-input-icon i svg g g{fill:#000}.datepicker-container .datepicker-calendar{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:250px;top:40px;position:absolute;z-index:99;background:#fff;border-bottom-left-radius:4px;border-bottom-right-radius:4px;box-shadow:0 2px 5px rgba(0,0,0,.5)}.datepicker-container .datepicker-calendar .datepicker-calendar-top{width:100%;height:80px;background:#000;display:inline-block;position:relative}.datepicker-container .datepicker-calendar .datepicker-calendar-top .year-title{display:block;margin-top:12px;color:#fff;font-size:28px;text-align:center}.datepicker-container .datepicker-calendar .datepicker-calendar-top button{width:150px;display:block;margin:0 auto;color:#fff;text-transform:uppercase;background:0 0;border:none;outline:none;font-size:12px;cursor:pointer;position:relative}.datepicker-container .datepicker-calendar .datepicker-calendar-top button svg{display:block;float:left;width:15px;height:15px;position:absolute;top:2px;left:12px}.datepicker-container .datepicker-calendar .datepicker-calendar-top .close svg g path,.datepicker-container .datepicker-calendar .datepicker-calendar-top button svg g,.datepicker-container .datepicker-calendar .datepicker-calendar-top button svg g path,.datepicker-container svg g,.datepicker-container svg g g{fill:#fff}.datepicker-container .datepicker-calendar .datepicker-calendar-top .close{position:absolute;top:5px;right:5px;font-size:20px;color:#fff;cursor:pointer}.datepicker-container .datepicker-calendar .datepicker-calendar-top .close svg{width:12px;height:12px}.datepicker-container .datepicker-calendar .datepicker-calendar-container{display:inline-block;width:100%;padding:10px;background:#222628}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;font-size:14px;color:#ddd;text-transform:uppercase}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section i:first-child{margin-left:12px}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section i:last-child{margin-right:12px}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-day-names{width:230px;margin-top:10px;display:inline-block;border:1px solid transparent}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-day-names span{font-size:12px;display:block;float:left;width:calc(100%/7);text-align:center}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container{width:230px;margin-top:5px;display:inline-block;border:1px solid transparent}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;float:left;font-size:14px;color:#8e8e8e;width:calc(100%/7);height:33px;text-align:center;border-radius:50%;cursor:pointer}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day.selected,.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day:hover:not(.disabled){background:#222628;border:1px solid #366aab;border-radius:4px}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day.disabled{pointer-events:none}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day.today{color:#366aab}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container{width:100%;height:240px}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container .year{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;float:left;font-size:14px;color:#8e8e8e;width:calc(100%/4);height:50px;text-align:center;border-radius:50%;cursor:pointer}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container .year.selected,.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container .year:hover{background:#222628;border:1px solid #366aab;border-radius:4px}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons{width:235px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button{width:100%;outline:none;display:inline-block;background:#099268;color:#fff;margin-right:5px;cursor:pointer;text-align:center;padding:5px 10px;border:1px solid #366aab;border-radius:4px}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-primary{background:#366aab}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-primary:active{background:#222628}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-secondary{background:#222628;color:#099268}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-secondary:active{background:#366aab;color:#ddd}.datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-secondary:hover{color:#fff}.datepicker-container svg{display:block;width:20px;height:20px}`],
  providers: [CALENDAR_VALUE_ACCESSOR],
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {
  @Input() options: DatePickerOptions;
  @Input() inputEvents: EventEmitter<{ type: string, data: string | DateModel }>;
  @Output() outputEvents: EventEmitter<{ type: string, data: string | DateModel }>;

  date: DateModel;

  opened: boolean;
  currentDate: moment.Moment;
  days: CalendarDate[];
  years: number[];
  yearPicker: boolean;
  scrollOptions: SlimScrollOptions;

  minDate: moment.Moment | any;
  maxDate: moment.Moment | any;

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  constructor( @Inject(ElementRef) public el: ElementRef, private device: Device) {
    this.opened = false;
    this.currentDate = Moment();
    this.options = this.options || {};
    this.days = [];
    this.years = [];
    this.date = new DateModel({
      day: null,
      month: null,
      year: null,
      formatted: null,
      momentObj: null
    });

    this.outputEvents = new EventEmitter<{ type: string, data: string | DateModel }>();

    if (!this.inputEvents) {
      return;
    }

    this.inputEvents.subscribe((event: { type: string, data: string | DateModel }) => {
      if (event.type === 'setDate') {
        this.value = event.data as DateModel;
      } else if (event.type === 'default') {
        if (event.data === 'open') {
          this.open();
        } else if (event.data === 'close') {
          this.close();
        }
      }
    });
  }

  get value(): DateModel {
    return this.date;
  }

  set value(date: DateModel) {
    if (!date) { return; }
    this.date = date;
    this.onChangeCallback(date);
  }

  ngOnInit() {
    this.options = new DatePickerOptions(this.options);
    this.scrollOptions = {
      barBackground: '#C9C9C9',
      barWidth: '7',
      gridBackground: '#C9C9C9',
      gridWidth: '2'
    };

    if (this.options.initialDate instanceof Date) {
      this.currentDate = Moment(this.options.initialDate);
      this.selectDate(null, this.currentDate);
    }

    if (this.options.minDate instanceof Date) {
      this.minDate = Moment(this.options.minDate);
    } else {
      this.minDate = null;
    }

    if (this.options.maxDate instanceof Date) {
      this.maxDate = Moment(this.options.maxDate);
    } else {
      this.maxDate = null;
    }

    this.generateYears();
    this.generateCalendar();
    this.outputEvents.emit({ type: 'default', data: 'init' });

    if (typeof window !== 'undefined') {
      const body = document.querySelector('body');
      body.addEventListener('click', e => {
        if (!this.opened || !e.target) { return; };
        if (this.el.nativeElement !== e.target && !this.el.nativeElement.contains((<any>e.target))) {
          this.close();
        }
      }, false);
    }

    if (this.inputEvents) {
      this.inputEvents.subscribe((e: any) => {
        if (e.type === 'action') {
          if (e.data === 'toggle') {
            this.toggle();
          }
          if (e.data === 'close') {
            this.close();
          }
          if (e.data === 'open') {
            this.open();
          }
        }

        if (e.type === 'setDate') {
          if (!(e.data instanceof Date)) {
            throw new Error(`Input data must be an instance of Date!`);
          }
          const date: moment.Moment = Moment(e.data);
          if (!date) {
            throw new Error(`Invalid date: ${e.data}`);
          }
          this.value = {
            day: date.format('DD'),
            month: date.format('MM'),
            year: date.format('YYYY'),
            formatted: date.format(this.options.format),
            momentObj: date
          };
        }
      });
    }
  }

  isMobile(): boolean{
    return this.device.isMobile() || this.device.isTablet();
  }

  generateCalendar() {
    const date: moment.Moment = Moment(this.currentDate);
    const month = date.month();
    const year = date.year();
    let n = 1;
    const firstWeekDay = (this.options.firstWeekdaySunday) ? date.date(2).day() : date.date(1).day();

    if (firstWeekDay !== 1) {
      n -= (firstWeekDay + 6) % 7;
    }

    this.days = [];
    const selectedDate: moment.Moment = this.date.momentObj;
    for (let i = n; i <= date.endOf('month').date(); i += 1) {
      const currentDate: moment.Moment = Moment(`${i}.${month + 1}.${year}`, 'DD.MM.YYYY');
      const today: boolean = (Moment().isSame(currentDate, 'day') && Moment().isSame(currentDate, 'month')) ? true : false;
      const selected: boolean = (selectedDate && selectedDate.isSame(currentDate, 'day')) ? true : false;
      let betweenMinMax = true;

      if (this.minDate !== null) {
        if (this.maxDate !== null) {
          betweenMinMax = currentDate.isBetween(this.minDate, this.maxDate, 'day', '[]') ? true : false;
        } else {
          betweenMinMax = currentDate.isBefore(this.minDate, 'day') ? false : true;
        }
      } else {
        if (this.maxDate !== null) {
          betweenMinMax = currentDate.isAfter(this.maxDate, 'day') ? false : true;
        }
      }

      const day: CalendarDate = {
        day: i > 0 ? i : null,
        month: i > 0 ? month : null,
        year: i > 0 ? year : null,
        enabled: i > 0 ? betweenMinMax : false,
        today: i > 0 && today ? true : false,
        selected: i > 0 && selected ? true : false,
        momentObj: currentDate
      };

      this.days.push(day);
    }
  }

  selectDate(e: MouseEvent, date: moment.Moment) {
    if (e) { e.preventDefault(); }

    setTimeout(() => {
      this.value = {
        day: date.format('DD'),
        month: date.format('MM'),
        year: date.format('YYYY'),
        formatted: date.format(this.options.format),
        momentObj: date
      };
      this.generateCalendar();

      this.outputEvents.emit({ type: 'dateChanged', data: this.value });
    });

    this.opened = false;
  }

  selectYear(e: MouseEvent, year: number) {
    e.preventDefault();

    setTimeout(() => {
      const date: moment.Moment = this.currentDate.year(year);
      this.value = {
        day: date.format('DD'),
        month: date.format('MM'),
        year: date.format('YYYY'),
        formatted: date.format(this.options.format),
        momentObj: date
      };
      this.yearPicker = false;
      this.generateCalendar();
    });
  }

  generateYears() {
    const date: moment.Moment = this.minDate || Moment().year(Moment().year() - 40);
    const toDate: moment.Moment = this.maxDate || Moment().year(Moment().year() + 40);
    const years = toDate.year() - date.year();

    for (let i = 0; i < years; i++) {
      this.years.push(date.year());
      date.add(1, 'year');
    }
  }

  writeValue(date: DateModel) {
    if (!date) { return; }
    this.date = date;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  prevMonth() {
    this.currentDate = this.currentDate.subtract(1, 'month');
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = this.currentDate.add(1, 'month');
    this.generateCalendar();
  }

  today() {
    this.currentDate = Moment();
    this.selectDate(null, this.currentDate);
  }

  toggle() {
    this.opened = !this.opened;
    if (this.opened) {
      this.onOpen();
    }

    this.outputEvents.emit({ type: 'default', data: 'opened' });
  }

  open() {
    this.opened = true;
    this.onOpen();
  }

  close() {
    this.opened = false;
    this.outputEvents.emit({ type: 'default', data: 'closed' });
  }

  onOpen() {
    this.yearPicker = false;
  }

  openYearPicker() {
    setTimeout(() => this.yearPicker = true);
  }

  clear() {
    this.value = { day: null, month: null, year: null, momentObj: null, formatted: null };
    this.close();
  }

}
