import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class DialogService {

  confirm(message: string): Observable<boolean> {
    const result = confirm(message);
    return of(result);
  }
}
