import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UpdateItemService {

  itemCount: any = '0';
  bucketList: any = [];
  private subject = new Subject<any>();

  constructor() {

  }

  getBucketListCount() {
    return this.itemCount;
  }

  setBucketList(val) {
    this.itemCount = val.toString();
  }

  updateList(list) {
    this.subject.next(list);
  }

  getUpdatedList(): Observable<any> {
    return this.subject.asObservable();
  }


}
