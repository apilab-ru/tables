import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FilterSet } from '../shared/filters/filter-interfaces';
import { findStringInObject, mapIterator } from '../shared/utils';
import { Relate, StatusWorker, StatusWorkerMap, User } from '../../api/api';
import { UserListService } from './user-list.service';
import { debounceTime, filter, finalize, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { DialogService } from '../core/dialog.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  @HostBinding('class.users') isMainClass = true;
  @HostBinding('class.page') isSecondClass = true;

  readonly limitItems = 5;

  filterSet: FilterSet = [
    {
      key: 'status',
      label: 'Статус',
      values: mapIterator(
        StatusWorkerMap, (value, label) => {
          return {
            label,
            value
          };
        })
    }
  ];

  isShowSpinner = false;
  searchString: string;

  filteredList: User[];

  private list: User[];
  private statusFilter: StatusWorker[] = [];

  // TODO show spinner in row
  private spinnerMap = new Map<number, boolean>();
  private filterList$ = new Subject();
  private destroyed$ = new Subject();

  private readonly debounceFilterStringTime = 200;

  constructor(
    private userListService: UserListService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.reloadList();

    this.filterList$
      .asObservable()
      .pipe(
        takeUntil(this.destroyed$.asObservable()),
        debounceTime(this.debounceFilterStringTime)
      )
      .subscribe(() => this.loadListFromFilter());
  }

  tickUpdateFilter(): void {
    this.filterList$.next();
  }

  onSendFilter(filter) {
    this.statusFilter = filter.status;
    this.loadListFromFilter();
  }

  getStatusName(status: StatusWorker): string {
    return StatusWorkerMap.get(status);
  }

  delete(item: User): void {
    this.dialogService
      .confirm(`Удалить пользователя ${item.name}?`)
      .pipe(
        filter(isConfirm => isConfirm),
        tap(() => this.spinnerMap.set(item.id, true)),
        mergeMap(() => this.userListService.deleteItem(item.id)),
        finalize(() => this.spinnerMap.set(item.id, false))
      )
      .subscribe(() => this.reloadList());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private reloadList(): void {
    this.isShowSpinner = true;
    this.userListService
      .getList()
      .pipe(
        finalize(() => this.isShowSpinner = false)
      )
      .subscribe(list => {
        this.list = list;
        this.loadListFromFilter();
      });
  }

  private loadListFromFilter(): void {
    this.filteredList = this.list
      .filter(this.filterByStatus.bind(this))
      .filter(this.filterBySearch.bind(this));
  }

  private filterByStatus(item: User): boolean {
    return !this.statusFilter.length
      || this.statusFilter
        .some(stId => item.status.some(stUser => stUser === stId))
  }

  private filterBySearch(item: User): boolean {
    return !this.searchString || findStringInObject(this.searchString, item);
  }

}
