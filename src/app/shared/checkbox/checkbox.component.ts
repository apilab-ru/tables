import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const NOOP = _ => {
};

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxComponent), multi: true }
  ]
})
export class CheckboxComponent<T> implements ControlValueAccessor {

  private propagateChange = NOOP;
  private _checkboxValue: boolean = false;

  @Input() value: T;

  writeValue(value: boolean): void {
    if (typeof value !== 'undefined') {
      setTimeout(() => this.checkboxValue = value);
    }
  }

  get checkboxValue(): boolean {
    return this._checkboxValue;
  }

  set checkboxValue(value: boolean) {
    this._checkboxValue = value;
    this.propagateChange(value);
  }

  registerOnChange(fn: (value) => void): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void): void {
  }
}
