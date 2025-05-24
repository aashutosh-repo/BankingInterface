import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FilterCriteria } from "../../model/interfaces/Transaction.model";

@Injectable({
  providedIn: 'root'
})

export class DataFilterService {
    private filterCriteria = new BehaviorSubject<FilterCriteria>({});
    filterCriteria$ = this.filterCriteria.asObservable();
    
    updateFilterCriteria(criteria: FilterCriteria) {
        this.filterCriteria.next(criteria);
        // console.log('Filter criteria updated:', criteria);
    }

    getCurrentFilterCriteria(): FilterCriteria {
        // console.log('Current filter criteria:', this.filterCriteria.getValue());
        return this.filterCriteria.getValue();
    }
}