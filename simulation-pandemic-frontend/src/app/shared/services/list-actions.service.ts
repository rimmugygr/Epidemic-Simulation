import { Injectable } from '@angular/core';
import {BehaviorSubject, merge, Observable, of, Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ListActionsService {

  private pageChange = new BehaviorSubject<boolean>(true);
  pageChange$ = this.pageChange.asObservable();

  private searchSubject = new Subject<string>();
  filterAction$: Observable<string>;

  constructor() {
    this.filterAction$ = merge(
      this.searchSubject.asObservable().pipe(debounceTime(1000)),
      of('')
    );
  }

  emmitPageAction() {
    this.pageChange.next(true);
  }

  emmitFilterAction(text: string): void {
    this.searchSubject.next(text);
  }
}
