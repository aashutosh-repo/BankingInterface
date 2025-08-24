import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({providedIn: 'root'})
export class LoaderService {
  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();
  private activeRequestCount = 0;

  show(): void {
    this.activeRequestCount++;
    this._loading.next(true);
  }

  hide(): void {
    this.activeRequestCount--;
    if (this.activeRequestCount <= 0){
        this.activeRequestCount = 0;
        this._loading.next(false);
    }
  }
}