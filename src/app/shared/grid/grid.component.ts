import { Component, ContentChild, Input, TemplateRef, TrackByFunction } from '@angular/core';
import { GridIteratorDirective } from './iterator.directive';
import { ItemsService } from './items.service';
import { RowContext } from './interfaces';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [
    ItemsService
  ]
})
export class GridComponent<T> {

  @Input() isShowSpinner = false;

  @ContentChild(GridIteratorDirective) private gridIterator: GridIteratorDirective<T>;

  constructor(
    private itemsService: ItemsService<T>
  ) {
  }

  @Input() set list(list: T[]) {
    this.itemsService.list = list;
  }

  get hasData(): boolean {
    return this.itemsService.data && !!this.itemsService.data.length;
  }

  get data(): T[] {
    return this.itemsService.list;
  }

  get trackBy(): TrackByFunction<T> {
    return this.gridIterator.gridIterator;
  }

  get rowTemplate(): TemplateRef<RowContext<T>> {
    return this.gridIterator.template;
  }

}
