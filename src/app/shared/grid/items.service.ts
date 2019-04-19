import { Injectable } from '@angular/core';
import { GridCellComponent } from './cell/cell.component';
import { baseSort, SortFunction } from './utils';
import { SortType } from './interfaces';

@Injectable()
export class ItemsService<T> {

  data: T[];

  sortCell: GridCellComponent<T>;

  sortType: SortType;

  get list(): T[] {
    return this.dataList;
  }

  set list(list: T[]) {
    this.data = list;
  }

  get dataList(): T[] {
    return !this.sortCell
      ? this.data
      : this.data.sort((a, b) => {
        const res = this.sortFunction(a[this.sortCell.sortFiled], b[this.sortCell.sortFiled]);
        return (this.sortType === SortType.ASC) ? res : this.inversionOrder(res);
      });
  }

  get sortCellId(): string {
    return this.sortCell ? this.sortCell.id : null;
  }

  get sortFunction(): SortFunction {
    return (this.sortCell && this.sortCell.sortFunction)
      ? this.sortCell.sortFunction
      : baseSort;
  }

  selectCell(cell: GridCellComponent<T>): void {
    this.sortCell = cell;
    this.sortType = SortType.ASC;
  }

  toggleSortType(): void {
    if (this.sortType === SortType.ASC) {
      this.sortType = SortType.DESC;
    } else {
      this.sortType = SortType.ASC;
    }
  }

  private inversionOrder(order: number): number {
    return order * -1;
  }
}
