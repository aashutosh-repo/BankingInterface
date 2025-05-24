import { CommonModule,isPlatformBrowser  } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Chart,ChartData, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartOptions, ArcElement, PieController } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Transaction, TRANSACTION_DATA, TransactionType } from '../../../model/interfaces/Transaction.model';
import { FormsModule } from '@angular/forms';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,       // Needed for Pie/Donut charts
  PieController,    // Needed for Pie charts
  DataLabelsPlugin
);

@Component({
  selector: 'app-bar-chart',
  imports: [CommonModule, FormsModule ,NgChartsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  public readonly DataLabelsPlugin = DataLabelsPlugin;
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  txnTypes: TransactionType[] = ['card', 'UPI', 'QR', 'Net_banking', 'Wallet', 'EMI'];
  selectedTxnType: TransactionType = 'UPI';
  selectedView: 'type-vs-amount' | 'type-vs-year' = 'type-vs-amount';

  transactions: Transaction[] = TRANSACTION_DATA;

  barChartOptions: ChartOptions<'bar'> = {};


  getBarChartOptions(title: string, yAxisMax: number): ChartOptions<'bar'> {
  return {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        padding: { bottom: 10 },
        font: { size: 20, weight: 'bold' },
      },
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#444',
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value: number) => value,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        }
      },
      y: {
        beginAtZero: true,
        max: yAxisMax,
        grid: {
          display: true,
        },
      },
    },
  };
}



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
      Wallet: 0,
      EMI: 0
    };

    for (const txn of this.transactions) {
      totals[txn.transaction_type] += txn.amount;
    } 

    const maxTotal = Math.max(...Object.values(totals));
    const yAxisMax = Math.ceil((maxTotal * 1.2) / 10000) * 10000;

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

    this.barChartOptions = this.getBarChartOptions(``, yAxisMax);

  }

  buildTxnTypeVsYearChart(type: TransactionType) {
    const yearTotals: Record<number, number> = {};

    for (const txn of this.transactions) {
      if (txn.transaction_type === type) {
        yearTotals[txn.year] = (yearTotals[txn.year] || 0) + txn.amount;
      }
    }

    const sortedYears = Object.keys(yearTotals).sort();
    const dataValues = sortedYears.map(y => yearTotals[+y]);
    const maxValue = Math.max(...dataValues);
    const yAxisMax = Math.ceil(maxValue * 1.2);

    this.barChartData = {
      labels: sortedYears,
      datasets: [
        {
          label: `${type} Vs Year`,
          data: dataValues,
          backgroundColor: '#EA4335',
        },
      ],
    };
  //   this.barChartOptions = {
  //   responsive: true,
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: `${type} VS Year`,
  //       padding: { bottom: 10 },
  //       font: { size: 20, weight: 'bold' },
  //       // color: '#05164d',
  //     },
  //     legend: {
  //       display: false,
  //     },
  //     datalabels: {
  //       anchor: 'end' as const,
  //       align: 'end' as const,
  //       color: '#444',
  //       font: {
  //         weight: 'bold' as const,
  //         size: 12,
  //       },
  //       formatter: (value: number) => value,
  //     },
  //   },
  //   scales: {
  //     x: {
  //       grid: {
  //         display: true,
  //       }
  //     },
  //     y: {
  //       beginAtZero: true,
  //       grid: {
  //         display: true,
  //       },
  //       max: yAxisMax,
  //     },
  //   },
  // };
    this.barChartOptions = this.getBarChartOptions(`${type} VS Year`, yAxisMax);

}

  pieChartData: ChartData<'pie'> = {
  labels: ['Card', 'UPI', 'QR', 'Net Banking', 'Wallet', 'EMI'],
  datasets: [
    {
      label: 'Transaction Share',
      data: [300, 500, 100, 200,20,60], // Example data
      backgroundColor: ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#FF9800', '#9C27B0'],
      hoverOffset: 4
    }
  ]
};

 pieChartOptions: ChartOptions<'pie'> = {
  responsive: true,
  
  plugins: {
    legend: {
      position: 'bottom'
    }
  },
 animation: {
  onComplete: function () {
    const chart = this;
    const ctx = chart.ctx as CanvasRenderingContext2D;
    const dataset = chart.getDatasetMeta(0);
    const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
    const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;

    // Fixed label X position on the left side
    const labelX = chart.chartArea.left - 120;  // 120px left from chart left edge

    dataset.data.forEach((el, index) => {
      const slice = el as unknown as ArcElement;
      const { x, y } = slice.tooltipPosition(true);
      const angle = slice.startAngle + (slice.endAngle - slice.startAngle) / 2;
      const radius = slice.outerRadius;

      // Calculate Y position based on slice center angle to vertically align labels with slices
      const labelY = centerY + Math.sin(angle) * radius;

      // Draw arrow line from label to slice edge
      // ctx.beginPath();
      // ctx.moveTo(labelX + 80, labelY);  // arrow starts near label (80 px right of labelX)
      // ctx.lineTo(x, y);  // arrow points to slice tooltip position
      // ctx.strokeStyle = '#666';
      // ctx.lineWidth = 1;
      // ctx.stroke();

      // // Draw label text left aligned at fixed labelX and labelY
      // ctx.font = '12px Arial';
      // ctx.fillStyle = '#000';
      // ctx.textBaseline = 'middle';
      // ctx.textAlign = 'left';

      // const label = chart.data.labels?.[index] || '';
      // const value = chart.data.datasets[0].data[index];
      // ctx.fillText(`${label}: ${value}`, labelX, labelY);
    });
  }
}

};
}
