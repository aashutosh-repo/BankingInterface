import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-emi-calculator',
  imports: [FormsModule,CommonModule],
  templateUrl: './emi-calculator.component.html',
  styleUrl: './emi-calculator.component.css'
})
export class EmiCalculatorComponent {

  loanAmount: number = 0;
  interestRate: number = 0;
  loanTenure: number = 0;
  emiResult: number | null = null;

  calculateEMI(): void {
    if (this.loanAmount && this.interestRate && this.loanTenure) {
      let monthlyInterest = this.interestRate / 12 / 100;
      let tenureMonths = this.loanTenure * 12;
      this.emiResult = (this.loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, tenureMonths)) /(Math.pow(1 + monthlyInterest, tenureMonths) - 1);
    }
  }

}
