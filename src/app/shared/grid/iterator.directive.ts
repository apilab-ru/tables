import { Directive, Input, TemplateRef, TrackByFunction } from '@angular/core';
import { RowContext } from './interfaces';

@Directive({
  selector: '[gridIterator][gridIteratorOf]'
})
export class GridIteratorDirective<T> {

  @Input() gridIterator: TrackByFunction<T>;

  @Input() gridIteratorOf: T[];

  constructor(public template: TemplateRef<RowContext<T>>) {
  }

}
