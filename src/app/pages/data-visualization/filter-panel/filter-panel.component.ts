import { Component, EventEmitter, Output } from '@angular/core';
import { FilterCriteria, TransactionType } from '../../../model/interfaces/Transaction.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-panel',
  imports: [CommonModule, FormsModule ],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.css'
})
export class FilterPanelComponent {

  @Output() filtersChanged = new EventEmitter<FilterCriteria>();

  transactionTypes: TransactionType[] = ['card', 'UPI', 'QR', 'Net_banking'];
  regions: string[] = ['North', 'South', 'East', 'West', 'Central'];

  filterCriteria: FilterCriteria = {
    startDate: undefined,
    endDate: undefined,
    transactionType: undefined,
    region: undefined,
  };

  emitFilters() {
    this.filtersChanged.emit({ ...this.filterCriteria });
  }

}
