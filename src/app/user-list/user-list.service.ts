import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../api/api';
import { USER_LIST } from '../../api/user-list';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private mockList = USER_LIST;
  private mockDelay = 500;

  getList(): Observable<User[]> {
    return of(this.mockList).pipe(delay(this.mockDelay));
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
