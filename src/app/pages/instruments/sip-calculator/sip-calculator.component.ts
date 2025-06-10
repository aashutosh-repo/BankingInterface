import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output,PLATFORM_ID  } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedMaterialModules } from '../../../shared/material-imports/shared-material.module';
import { NgChartsModule } from 'ng2-charts';
import { isPlatformBrowser } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChartData, ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'app-sip-calculator',
  imports: [...SharedMaterialModules, ReactiveFormsModule, NgChartsModule,MatTooltipModule],
  templateUrl: './sip-calculator.component.html',
  styleUrls: ['./sip-calculator.component.css']
})
export class SipCalculatorComponent {
@Input() initialValues: any = {
    sipAmount: 5000,
    stepUpPercentage: 10,
    investmentPeriod: 10,
    expectedReturnRate: 12
  };
    isBrowser = false;
  @Output() formSubmitted = new EventEmitter<any>();
  
  calculatorForm!: FormGroup;
  
  constructor(private fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: object
  ) {
        this.isBrowser = isPlatformBrowser(platformId);

  }
  
  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(): void {
    this.calculatorForm = this.fb.group({
      sipAmount: [this.initialValues.sipAmount, [Validators.required, Validators.min(500), Validators.max(100000)]],
      stepUpPercentage: [this.initialValues.stepUpPercentage, [Validators.required, Validators.min(0), Validators.max(25)]],
      investmentPeriod: [this.initialValues.investmentPeriod, [Validators.required, Validators.min(1), Validators.max(30)]],
      expectedReturnRate: [this.initialValues.expectedReturnRate, [Validators.required, Validators.min(5), Validators.max(20)]]
    });
    
    // Real-time calculation as values change
    this.calculatorForm.valueChanges.subscribe(values => {
      if (this.calculatorForm.valid) {
        this.formSubmitted.emit(values);
      }
    });
  }
  
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }
  
  onSubmit(): void {
    if (this.calculatorForm.valid) {
      this.formSubmitted.emit(this.calculatorForm.value);
    }
  }
  
  resetForm(): void {
    this.calculatorForm.reset(this.initialValues);
    this.formSubmitted.emit(this.initialValues);
  }

  totalInvestment = 5709649;
  returns = 6125575;
  pieChartLabels: string[] = ['Investment', 'Returns'];
  // pieChartData: number[] = [this.totalInvestment, this.returns];

  pieChartType: ChartType = 'pie';

pieChartData: ChartData<'pie', number[], string | string[]> = {
  labels: ['Investment', 'Returns'],
  datasets: [
    {
      data: [5709649, 6125575],
      backgroundColor: ['#42A5F5', '#66BB6A'],
    }
  ]
};

  barChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Year'
      },
      ticks: {
        color: '#333'
      }
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Amount (in Lakhs)'
      },
      ticks: {
        color: '#333'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true
    }
  }
};

  barChartType: ChartType = 'bar';
  displayedColumns: string[] = ['year', 'investment', 'return', 'maturity'];

yearlyData = [
  { year: 2025, investment: 60000, return: 3000, maturity: 63000 },
  { year: 2026, investment: 126000, return: 10000, maturity: 136000 },
  { year: 2025, investment: 60000, return: 3000, maturity: 63000 },
  { year: 2026, investment: 126000, return: 10000, maturity: 136000 },
  { year: 2025, investment: 60000, return: 3000, maturity: 63000 },
  { year: 2026, investment: 126000, return: 10000, maturity: 136000 },
  { year: 2025, investment: 60000, return: 3000, maturity: 63000 },
  { year: 2026, investment: 126000, return: 10000, maturity: 136000 },
  { year: 2025, investment: 60000, return: 3000, maturity: 63000 },
  { year: 2026, investment: 126000, return: 10000, maturity: 136000 },
  { year: 2025, investment: 60000, return: 3000, maturity: 63000 },
  { year: 2026, investment: 126000, return: 10000, maturity: 136000 },
  { year: 2025, investment: 60000, return: 3000, maturity: 63000 },
  { year: 2026, investment: 126000, return: 10000, maturity: 136000 },
  { year: 2026, investment: 126000, return: 10000, maturity: 136000 }
];


barChartData = {
  labels: this.yearlyData.map(d => d.year.toString()),
  datasets: [
    {
      label: 'Maturity Value (in Lakhs)',
      data: this.yearlyData.map(d => +(d.maturity / 100000).toFixed(2)),
      backgroundColor: '#42a5f5',
      borderRadius: 4,
      barThickness: 24
    }
  ]
};
}
