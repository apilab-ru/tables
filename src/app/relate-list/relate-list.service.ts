import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Relate } from '../../api/api';
import { RELATE_LIST } from '../../api/relate-list';

@Injectable()
export class RelateListService {

  private mockList = RELATE_LIST;

  getList(): Observable<Relate[]> {
    return of(this.mockList);
  }

  deleteItem(id: number): Observable<{}> {
    const index = this.mockList.findIndex(item => item.id === id);
    if (index === -1) {
      return of(new Error('Not found'));
    } else {
      this.mockList.splice(index, 1);
      return of(true);
    }
  }
}
