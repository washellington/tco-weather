import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationInfoService {

  applicationTitle = new BehaviorSubject<string>("TCO Weather")
  applicationTitle$ = this.applicationTitle.asObservable()
  constructor() { }

  setTitle(x:string){
    this.applicationTitle.next(x)
  }

  getTitle():Observable<string>{
    return this.applicationTitle$
  }
}
