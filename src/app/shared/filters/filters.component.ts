import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterItem, FilterSet, FilterValueVal, SendFilter } from './filter-interfaces';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  @Input() filterSet: FilterSet;

  @Output() sendFilter = new EventEmitter<SendFilter>();

  private values: SendFilter = {};

  onUpdateFilterItem(item: FilterItem, value: FilterValueVal[]): void {
    this.values[item.key] = value;
  }

  submitFilter(): void {
    this.sendFilter.emit(this.values);
  }
}
