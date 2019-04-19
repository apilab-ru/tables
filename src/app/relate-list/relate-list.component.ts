import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { RelateListService } from './relate-list.service';
import { Relate, RelateItem, StatusDto, Statuses, StatusMap } from '../../api/api';
import { DialogService } from '../core/dialog.service';
import { debounceTime, filter, finalize, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { findStringInObject, mapIterator } from '../shared/utils';
import { Subject } from 'rxjs';
import { FilterSet, FilterValue } from '../shared/filters/filter-interfaces';
import { RelateFilter } from './relate-filter';

@Component({
  selector: 'app-relate-list',
  templateUrl: './relate-list.component.html',
  styleUrls: ['./relate-list.component.scss'],
  providers: [RelateListService]
})
export class RelateListComponent implements OnInit, OnDestroy {

  @HostBinding('class.relate') isMainClass = true;
  @HostBinding('class.page') isSecondClass = true;

  isShowSpinner = false;
  searchString: string;

  filteredList: Relate[];
  filterSet: FilterSet = [
    {
      key: 'status',
      label: 'Статус',
      values: mapIterator<number, StatusDto, FilterValue>(StatusMap, (key, value) => {
        return {
          label: value.name,
          value: key
        };
      })
    },
    {
      key: 'relateItems',
      label: 'RelateItems',
      values: []
    }
  ];

  private list: Relate[];
  // TODO show spinner in row
  private spinnerMap = new Map<number, boolean>();
  private filterList$ = new Subject();
  private destroyed$ = new Subject();

  private filter: RelateFilter = {
    status: [],
    relateItems: []
  };

  private readonly debounceFilterStringTime = 200;

  constructor(
    private relateService: RelateListService,
    private dialogService: DialogService
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

  getStatus(status: Statuses): StatusDto {
    return StatusMap.get(status);
  }

  tickUpdateFilter(): void {
    this.filterList$.next();
  }

  delete(id: number): void {
    this.dialogService
      .confirm('Удалить элемент?')
      .pipe(
        filter(result => result),
        tap(() => {
          this.spinnerMap.set(id, true);
        }),
        mergeMap(() => this.relateService.deleteItem(id)),
        finalize(() => {
          this.spinnerMap.set(id, false);
        })
      )
      .subscribe(() => {
        this.reloadList();
      });
  }

  onSendFilter(filter: RelateFilter): void {
    this.filter = filter;
    this.loadListFromFilter();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  sortByRelate(prev: RelateItem[], next: RelateItem[]): number {
    return prev.reduce((index, it) => it.id, 0)
      - next.reduce((index, it) => it.id, 0);
  }

  private reloadList(): void {
    this.isShowSpinner = true;
    this.relateService
      .getList()
      .pipe(finalize(() => this.isShowSpinner = false))
      .subscribe(
        list => {
          this.list = list;
          this.loadListFromFilter();
          this.initFilters(list);
        }
      );
  }

  private loadListFromFilter(): void {
    this.filteredList = this.list
      .filter(this.filterBySearch.bind(this))
      .filter(this.filterByStatus.bind(this))
      .filter(this.filterByRelate.bind(this));
  }

  private filterBySearch(item: Relate): boolean {
    return !this.searchString || findStringInObject(this.searchString, item);
  }

  private filterByStatus(item: Relate): boolean {
    return !this.filter.status.length
      || this.filter.status.indexOf(item.status) !== -1;
  }

  private filterByRelate(item: Relate): boolean {
    return !this.filter.relateItems.length
      || item.relateItems.some(relate => this.filter.relateItems.indexOf(relate.id) !== -1);
  }

  private initFilters(list: Relate[]): void {
    const objMap = new Map();
    list.forEach(item => {
      item.relateItems.forEach(it => objMap.set(it.id, it.name));
    });

    const result: FilterValue[] = [];
    objMap.forEach((value, key) => result.push({
      value: key,
      label: value
    }));

    this.filterSet[1].values = result;
  }

}
