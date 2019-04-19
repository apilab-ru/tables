import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { SortFunction } from '../utils';
import { SortType } from '../interfaces';

@Component({
  selector: 'grid-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class GridCellComponent<T> implements OnInit {

  id: string;

  @Input() sortFunction: SortFunction;

  @Input() sortFiled: string;
  @HostBinding('class.control')
  @Input()
  control: boolean;

  constructor(private itemsService: ItemsService<T>) {
  }

  @HostBinding('class.head') get isHead(): boolean {
    return !!this.sortFiled;
  }

  @HostBinding('class.sort-active') get isSortActive(): boolean {
    return this.itemsService.sortCellId === this.id;
  }

  get isSortAsc(): boolean {
    return this.itemsService.sortType !== SortType.DESC;
  }

  get isSortDesc(): boolean {
    return this.itemsService.sortType === SortType.DESC;
  }

  @HostListener('click') onClickCell(): void {
    if (this.isHead) {
      if (this.isSortActive) {
        this.itemsService.toggleSortType();
      } else {
        this.itemsService.selectCell(this);
      }
    }
  }

  ngOnInit(): void {
    this.id = this.makeId();
  }

  makeId(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 12; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

}
