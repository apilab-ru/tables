import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterItem, FilterValue, FilterValueVal } from '../filter-interfaces';

@Component({
  selector: 'app-filters-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class FiltersItemComponent {

  @Input() filterItem: FilterItem;

  @Output() updateFilter = new EventEmitter<FilterValueVal[]>();

  private selectedItems: FilterValueVal[] = [];

  isChecked(item: FilterValue): boolean {
    return this.selectedItems.indexOf(item.value) !== -1;
  }

  markAsChecked(item: FilterValue, isCheck: boolean): void {
    if (isCheck) {
      this.selectedItems.push(item.value);
    } else {
      const index = this.selectedItems.indexOf(item.value);
      this.selectedItems.splice(index, 1);
    }
    this.updateFilter.emit(this.selectedItems);
  }

}
