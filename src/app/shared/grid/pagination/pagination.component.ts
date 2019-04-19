import { Component, HostBinding, Input } from '@angular/core';
import { ItemsService } from '../items.service';
import { PaginationItem } from '../interfaces';

@Component({
  selector: 'grid-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent<T> {

  @Input() isShowTotal = true;

  @HostBinding('class.pagination') isMainClass = true;

  constructor(
    private itemsService: ItemsService<T>
  ) { }

  get first(): boolean {
    return this.itemsService.page === 1;
  }

  get isShowPagination(): boolean {
    return this.itemsService.pagesCount > 1;
  }

  get last(): boolean {
    return this.itemsService.page === this.itemsService.pagesCount;
  }

  get pages(): PaginationItem[] {
    return this.itemsService.pages;
  }

  get total(): number {
    return this.itemsService.data.length;
  }

  navigateTo(page: number): void {
    this.itemsService.page = page;
  }

  back(): void {
    this.navigateTo(this.currentPage - 1);
  }

  forward(): void {
    this.navigateTo(this.currentPage + 1);
  }

  private get currentPage(): number {
    return this.itemsService.page;
  }

}
