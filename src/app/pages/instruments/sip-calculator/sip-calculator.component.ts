import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedMaterialModules } from '../../../shared/material-imports/shared-material.module';
import { NgChartsModule } from 'ng2-charts';
import { isPlatformBrowser } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SIP } from '../../../model/interfaces/instruments/instrument.model';
import { BarChartOptions, PieChartOptions } from '../../../shared/charts/chart-config';

@Component({
  selector: 'app-sip-calculator',
  imports: [
    ...SharedMaterialModules,
    ReactiveFormsModule,
    NgChartsModule,
    MatTooltipModule,
    MatButtonToggleModule,
  ],
  templateUrl: './sip-calculator.component.html',
  styleUrls: ['./sip-calculator.component.css'],
})
export class SipCalculatorComponent implements OnInit {
  @Input() initialValues: any = {
    sipType: 'monthly',
    sipAmount: 5000,
    stepUpPercentage: 0,
    investmentPeriod: 10,
    expectedReturnRate: 12,
  };
  isBrowser = false;
  @Output() formSubmitted = new EventEmitter<any>();

  calculatorForm!: FormGroup;
  totalReturn: number = 0;
  barChartOptions = BarChartOptions;
  pieChartOptions= PieChartOptions;
  // selectedSipType: 'monthly' | 'stepup' | 'inflation' = 'monthly';

  private getFormValues() {
  return {
    sipType: this.calculatorForm.get('sipType')?.value,
    sipAmount: this.calculatorForm.get('sipAmount')?.value,
    stepUpPercentage: this.calculatorForm.get('stepUpPercentage')?.value,
    expectedReturnRate: this.calculatorForm.get('expectedReturnRate')?.value,
    investmentPeriod: this.calculatorForm.get('investmentPeriod')?.value,
  };
}


  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.calculatorForm = this.fb.group({
      sipType: ['monthly'],
      sipAmount: [
        this.initialValues.sipAmount,
        [Validators.required, Validators.min(500), Validators.max(100000)],
      ],
      stepUpPercentage: [
        this.initialValues.stepUpPercentage,
        [Validators.required, Validators.min(0), Validators.max(25)],
      ],
      investmentPeriod: [
        this.initialValues.investmentPeriod,
        [Validators.required, Validators.min(1), Validators.max(30)],
      ],
      expectedReturnRate: [
        this.initialValues.expectedReturnRate,
        [Validators.required, Validators.min(5), Validators.max(20)],
      ],
    });

    // Real-time calculation as values change
    this.calculatorForm.valueChanges.subscribe((values) => {
      if (this.calculatorForm.valid) {
        this.formSubmitted.emit(values);
      }

      const {sipType, sipAmount, stepUpPercentage, investmentPeriod, expectedReturnRate } = this.getFormValues();
      this.calculateStepUpSip(
        sipAmount,
        stepUpPercentage,
        investmentPeriod,
        expectedReturnRate
      );
    });
    // Debounce for performance
    this.calculatorForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
    const { sipAmount, stepUpPercentage, investmentPeriod, expectedReturnRate } = this.getFormValues();
    this.calculateStepUpSip(
      sipAmount,
      stepUpPercentage,
      investmentPeriod,
      expectedReturnRate
    );
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
        data: [this.totalInvestment, this.returns],
        backgroundColor: ['#42A5F5', '#66BB6A'],
      },
    ],
  };

  barChartType: ChartType = 'bar';
  displayedColumns: string[] = ['year', 'investment', 'return', 'maturity'];

  yearlyData: SIP[] = [];

  barChartData = {
    labels: this.yearlyData.map((d) => d.year.toString()),
    datasets: [
      {
        label: 'Maturity Value (in Lakhs)',
        data: this.yearlyData.map((d) => +(d.maturity / 100000).toFixed(2)),
        backgroundColor: '#42a5f5',
        borderRadius: 4,
        barThickness: 24,
      },
    ],
  };

  onSliderChange(event: any, field: string): void {
    const sipAmount = this.calculatorForm.get('sipAmount')?.value;
    const stepUpPercentage = this.calculatorForm.get('stepUpPercentage')?.value;
    const expectedReturnRate =
      this.calculatorForm.get('expectedReturnRate')?.value;
    const investmentPeriod = this.calculatorForm.get('investmentPeriod')?.value;
    const value = event.target.value;
    this.calculatorForm.get(field)?.setValue(value);
    
    console.log(`Slider released for ${field}, field`, value);
    // Trigger backend or chart update
    if (this.calculatorForm.get('sipType')?.value === 'monthly') {
      this.calculateStepUpSip(
        sipAmount,
        0,
        investmentPeriod,
        expectedReturnRate
      );
    } else if (this.calculatorForm.get('sipType')?.value === 'stepup') {
      this.calculateStepUpSip(
        sipAmount,
        stepUpPercentage,
        investmentPeriod,
        expectedReturnRate
      );
    }
  }

  calculateStepUpSip(
    baseMonthlyInvestment: number,
    annualIncreaseRatePercent: number,
    totalYears: number,
    annualReturnRatePercent: number
  ): number {
    const months = totalYears * 12;
    const monthlyRate = annualReturnRatePercent / 12 / 100;
    const annualIncreaseRate = annualIncreaseRatePercent / 100;

    let futureValue = 0;
    this.totalInvestment = 0;
    this.returns = 0;

    this.yearlyData = []; // Reset yearly data for new calculation
    let yearlyInvestment = 0;
    let yearlyReturn = 0;
    let yearStart = new Date().getFullYear();

    for (let month = 1; month <= months; month++) {
      const yearsPassed = Math.floor((month - 1) / 12);
      const monthsUntilNow = month;
      const stepUpAmount =
        baseMonthlyInvestment * Math.pow(1 + annualIncreaseRate, yearsPassed);
      // const remainingMonths = months - month + 1;
      const compoundedAmount =
        stepUpAmount * Math.pow(1 + monthlyRate, monthsUntilNow);
      futureValue += compoundedAmount;
      this.totalInvestment += stepUpAmount;
      this.returns += compoundedAmount - stepUpAmount;

      yearlyInvestment += stepUpAmount;
      yearlyReturn += compoundedAmount - stepUpAmount;
      //add pie chart here
      this.updatePieChartData(this.totalInvestment, this.returns);
      //At the end of each year, push data to yearlyData
      if (month % 12 === 0) {
        const year = yearStart + yearsPassed;
        this.yearlyData.push({
          year: year,
          investment: Math.round(this.totalInvestment),
          return: Math.round(this.returns),
          maturity: Math.round(this.totalInvestment + this.returns),
        });
      }
      this.barChartData = {
        labels: this.yearlyData.map((d) => d.year.toString()),
        datasets: [
          {
            label: 'Investment Amount (in Lakhs)',
            data: this.yearlyData.map(
              (d) => +(d.investment / 100000).toFixed(2)
            ),
            backgroundColor: '#66bb6a',
            borderRadius: 4,
            barThickness: 16,
          },
          {
            label: 'Maturity Value (in Lakhs)',
            data: this.yearlyData.map((d) => +(d.maturity / 100000).toFixed(2)),
            backgroundColor: '#42a5f5',
            borderRadius: 4,
            barThickness: 16,
          },
        ],
      };
    }
    this.totalReturn = Math.round(this.totalInvestment + this.returns);
    console.log(`Total Investment: ₹${this.totalInvestment}`);
    console.log(`Total Returns: ₹${this.returns}`);
    return Math.round(futureValue);
  }

  updatePieChartData(investment: number, returns: number): void {
    this.pieChartData = {
      ...this.pieChartData, //... means  spread operator shallow copy of the existing object
      datasets: [
        {
          data: [Math.round(investment), Math.round(returns)],
          backgroundColor: ['#42A5F5', '#66BB6A'],
        },
      ],
    };
  }

  onSipTypeChange(event: any): void {
    const type = event.value;

    switch (type) {
      case 'monthly':
        this.calculatorForm.patchValue({
          stepUpPercentage: 0,
          inflationRate: 0,
        });
        break;

      case 'stepup':
        this.calculatorForm.patchValue({
          stepUpPercentage: 10,
          inflationRate: 0,
        });
        break;

      case 'inflation':
        this.calculatorForm.patchValue({
          stepUpPercentage: 0,
          inflationRate: 6,
        });
        break;
    }
    this.onSubmit(); // or your calculation function
  }
}
