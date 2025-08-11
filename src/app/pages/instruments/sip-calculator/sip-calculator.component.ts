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
// import { NgChartsModule } from 'ng2-charts';
import { isPlatformBrowser } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SipCalculationInput, SipYearlyData } from '../../../model/interfaces/instruments/instrument.model';
import { BarChartOptions, PieChartOptions } from '../../../shared/charts/chart-config';
import { SipCalculatorService } from '../../../services/data-visualization/SipCalculatorService';

@Component({
  selector: 'app-sip-calculator',
  imports: [
    ...SharedMaterialModules,
    ReactiveFormsModule,
    // NgChartsModule,
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
    inflationRate: 6,
  };
  isBrowser = false;
  @Output() formSubmitted = new EventEmitter<any>();

  calculatorForm!: FormGroup;
  input!: SipCalculationInput;
  totalInvestment: number = 0;
  returns: number = 0;
  totalReturn: number = 0;
  result : any ;
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
      inflationRate: this.calculatorForm.get('inflationRate')?.value,
    };
  }


  constructor(
    private sipCalculatorService: SipCalculatorService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initForm();
    this.runCalculation();
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
      inflationRate: [
        this.initialValues.inflationRate,
        [Validators.required, Validators.min(0), Validators.max(15)],
      ],
    });

    // Real-time calculation as values change
    this.calculatorForm.valueChanges.subscribe((values) => {
      if (this.calculatorForm.valid) {
        this.formSubmitted.emit(values);
      }

      // this.runCalculation();
    });
    // Debounce for performance
    this.calculatorForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe(() => this.runCalculation());

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

  yearlyData: SipYearlyData[] = [];

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
    const value = event.target.value;
    this.calculatorForm.get(field)?.setValue(value);
    
    console.log(`Slider released for ${field}, field`, value);
    // Trigger backend or chart update
    
    if (this.calculatorForm.get('sipType')?.value === 'monthly') {
      // this.runCalculation();
    } else if (this.calculatorForm.get('sipType')?.value === 'stepup') {
      // this.runCalculation
    }else if (this.calculatorForm.get('sipType')?.value === 'inflation') {
      this.input = this.getFormValues();
      // const result = this.sipCalculatorService.calculateSipWithInflation(this.input);
      // console.log('Inflation SIP result:', result);
    }
  }

    updatePieChartData(): void {
      this.pieChartData = {
        datasets: [
          {
            data: [Math.round(this.totalInvestment), Math.round(this.returns)],
            backgroundColor: ['#42A5F5', '#66BB6A'],
          },
        ],
      };
    }

    updateBarChartData(): void {
      this.barChartData = {
        labels: this.yearlyData.map((d) => d.year.toString()),
        datasets: [
          {
            label: 'Investment Amount (in Lakhs)',
            data: this.yearlyData.map((d) =>
              +(d.investment / 100000).toFixed(2)
            ),
            backgroundColor: '#66bb6a',
            borderRadius: 4,
            barThickness: 16,
          },
          {
            label: 'Maturity Value (in Lakhs)',
            data: this.yearlyData.map((d) =>
              +(d.maturity / 100000).toFixed(2)
            ),
            backgroundColor: '#42a5f5',
            borderRadius: 4,
            barThickness: 16,
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
        console.log('Step Up SIP selected');
        break;

      case 'inflation':
        this.calculatorForm.patchValue({
          stepUpPercentage: 0,
          inflationRate: 6,
        });
        break;
    }
    this.onSubmit(); // or your calculation function
    // this.runCalculation()
  }



  private runCalculation(): void {
  const {
    sipType,
    sipAmount,
    stepUpPercentage,
    investmentPeriod,
    expectedReturnRate,
    inflationRate,
  } = this.getFormValues();

  let actualStepUp = stepUpPercentage;
  let adjustedReturnRate = expectedReturnRate;
  // if (sipType === 'monthly') {
  //   actualStepUp = 0;
  // } else if (sipType === 'inflation') {
  //   actualStepUp = 0;
  //   adjustedReturnRate = expectedReturnRate - inflationRate;
  // }

  // this.result = this.sipCalculatorService.calculateStepUpSip(
  //   sipAmount,
  //   actualStepUp,
  //   investmentPeriod,
  //   adjustedReturnRate
  // );
  // if(sipType === 'inflation') {
  //   this.input = this.getFormValues();
  //   this.result = this.sipCalculatorService.calculateSipWithInflation(this.input);  
  // }

  if (sipType === 'inflation') {
  this.input = this.getFormValues();
  console.log('Input for Inflation SIP:', this.input);
  this.result = this.sipCalculatorService.calculateSipWithInflation(this.input);
  console.log('Inflation SIP result:', this.result);
} else {
  this.result = this.sipCalculatorService.calculateStepUpSip(
    sipAmount,
    actualStepUp,
    investmentPeriod,
    adjustedReturnRate
  );
}


  this.totalInvestment = this.result.totalInvestment;
  this.returns = this.result.returns;
  this.totalReturn = this.result.totalReturn;
  this.yearlyData = this.result.yearlyData;
  // console.log('sipType:', sipType);
  console.log('result:', this.result);
  // console.log('Yearly Data:', this.yearlyData);


  this.updatePieChartData();
  this.updateBarChartData();
}

}
