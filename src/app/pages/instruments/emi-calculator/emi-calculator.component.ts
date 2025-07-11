import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreServicesService } from '../../../services/core/core-services.service';
import { emiCalculationInput, EMIResponse, RepaymentFrequency } from '../../../model/interfaces/instruments/emi.model';
import { EnumHelperService } from '../../../services/utility/enum-helper.service';

@Component({
  selector: 'app-emi-calculator',
  imports: [FormsModule,CommonModule],
  templateUrl: './emi-calculator.component.html',
  styleUrl: './emi-calculator.component.css'
})
export class EmiCalculatorComponent {
  constructor( // Inject your core service here if needed
     private coreService: CoreServicesService,
     private enumHelper: EnumHelperService
     ) {
      this.repaymentFrequencyOptions = this.enumHelper.getEnumAsArray(RepaymentFrequency);
     }

  repaymentFrequencyOptions: { key: string; value: number }[];
  loanAmount: number = 0;
  interestRate: number = 0;
  loanTenure: number = 0;
  emiResponse:any;
  emiResult: number = 0;

  calculateEMI(): void {
    if (this.loanAmount && this.interestRate && this.loanTenure) {
      let monthlyInterest = this.interestRate / 12 / 100;
      let tenureMonths = this.loanTenure * 12;
      this.emiResult = (this.loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, tenureMonths)) /(Math.pow(1 + monthlyInterest, tenureMonths) - 1);
    }
    this.calculateEmi2()

  }

  async calculateEmi2() {
    const emiInput : emiCalculationInput = {
      loanAmount: 500000, 
      annualInterestRate: 11.5, 
      tenureInYears: 5,
      startDate: new Date("2025-07-11"), // Start date of the loan
      repaymentFrequency:  RepaymentFrequency.Monthly// Assuming monthly repayment frequency; 
    }
      const delay = new Promise(resolve => setTimeout(resolve, 3000));

      try{
       const response =  this.coreService.canculateEmi(emiInput);
      const [res] = await Promise.all([response, delay]);
      console.log('EMI Calculation Response:', res);
      }catch (error) {
        console.error('Error during EMI calculation:', error);
    }
  }
}
