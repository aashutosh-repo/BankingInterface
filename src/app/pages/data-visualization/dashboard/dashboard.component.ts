import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SummaryCardsComponent } from '../summary-cards/summary-cards.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { SuccessFailureChartComponent } from '../success-failure-chart/success-failure-chart.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { GeoChartComponent } from '../geo-chart/geo-chart.component';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import { FilterCriteria } from '../../../model/interfaces/Transaction.model';
import { DataFilterService } from '../../../services/data-visualization/filter.service';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,
    RouterModule,
    SummaryCardsComponent,
    GeoChartComponent,
    BarChartComponent,
    LineChartComponent,
    FilterPanelComponent,
    SuccessFailureChartComponent, MatTableModule, MatTabsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  activeTab: 'overview' | 'time' | 'success' = 'overview';
  constructor(private filterService: DataFilterService) {}

  setTab(tab: 'overview' | 'time' | 'success') {
    this.activeTab = tab;
  }
  selectedIndex = 0;

  onTabChange(index: number) {
    this.selectedIndex = index;
  }
  onFiltersChanged(filters: FilterCriteria) {
  // You can emit this to a service or handle it directly in the component
    this.filterService.updateFilterCriteria(filters);
  }

}
