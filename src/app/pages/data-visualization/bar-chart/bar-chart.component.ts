import { CommonModule,isPlatformBrowser  } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Chart,ChartData, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Transaction, TRANSACTION_DATA, TransactionType } from '../../../model/interfaces/Transaction.model';
import { FormsModule } from '@angular/forms';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, DataLabelsPlugin);


@Component({
  selector: 'app-bar-chart',
  imports: [CommonModule, FormsModule ,NgChartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {
  public readonly DataLabelsPlugin = DataLabelsPlugin;
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  txnTypes: TransactionType[] = ['card', 'UPI', 'QR', 'Net_banking'];
  selectedTxnType: TransactionType = 'UPI';
  selectedView: 'type-vs-amount' | 'type-vs-year' = 'type-vs-amount';

  transactions: Transaction[] = TRANSACTION_DATA;

  barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    datalabels: {
      anchor: 'end' as const,
  align: 'end' as const,        // Align label outside the bar
      color: '#444',       // Label color
      font: {
       weight: 'bold' as 'bold' | 'normal' | 'bolder' | 'lighter', 
       size: 12 ,
      },
      formatter: (value: number) => value, // show the value itself
    },
  },
  scales: {
    x: {
      // your x axis config
    },
    y: {
      beginAtZero: true,
    }
  }
};


  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  ngOnInit(): void {
    if (this.isBrowser) {
      this.updateChart();
    }
  }

  setView(view: 'type-vs-amount' | 'type-vs-year') {
    this.selectedView = view;
    this.updateChart();
  }

  updateChart() {
    if (this.selectedView === 'type-vs-amount') {
      this.buildTypeVsAmountChart();
    } else if (this.selectedView === 'type-vs-year') {
      this.buildTxnTypeVsYearChart(this.selectedTxnType);
    }
  }

  buildTypeVsAmountChart() {
    const totals: Record<TransactionType, number> = {
      card: 0,
      UPI: 0,
      QR: 0,
      Net_banking: 0,
    };

    for (const txn of this.transactions) {
      totals[txn.transaction_type] += txn.amount;
    }

    this.barChartData = {
      labels: Object.keys(totals),
      datasets: [
        {
          label: 'Total Amount by Type',
          data: this.txnTypes.map(type => totals[type]),
          backgroundColor: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
        },
      ],
    };
  }

  buildTxnTypeVsYearChart(type: TransactionType) {
    const yearTotals: Record<number, number> = {};

    for (const txn of this.transactions) {
      if (txn.transaction_type === type) {
        yearTotals[txn.year] = (yearTotals[txn.year] || 0) + txn.amount;
      }
    }

    const sortedYears = Object.keys(yearTotals).sort();

    this.barChartData = {
      labels: sortedYears,
      datasets: [
        {
          label: `${type} Amount by Year`,
          data: sortedYears.map(y => yearTotals[+y]),
          backgroundColor: '#EA4335',
        },
      ],
    };
  }
}
