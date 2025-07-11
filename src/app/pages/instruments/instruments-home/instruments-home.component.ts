import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SipCalculatorComponent } from '../sip-calculator/sip-calculator.component';
import { HolidaysCalenderComponent } from '../holidays-calender/holidays-calender.component';
import { EmiCalculatorComponent } from '../emi-calculator/emi-calculator.component';
import { CurrencyConvertorComponent } from '../currency-convertor/currency-convertor.component';
import { CoreServicesService } from '../../../services/core/core-services.service';

@Component({
  selector: 'app-instruments-home',
  imports: [FormsModule, CommonModule, MatTabsModule, MatTableModule,
    SipCalculatorComponent, HolidaysCalenderComponent, EmiCalculatorComponent, CurrencyConvertorComponent
  ],
  templateUrl: './instruments-home.component.html',
  styleUrls: ['./instruments-home.component.css']
})
export class InstrumentsHomeComponent {
  constructor(
  ) { }
  selectedIndex = 0;
  onTabChange(index: number) {
   this.selectedIndex = index;
  }

  activeTab: 'overview' | 'time' | 'success' = 'overview';
  
  setTab(tab: 'overview' | 'time' | 'success') {
    this.activeTab = tab;
  }
  
  EmiCalculatorData: any = {
    loanAmount: 100000,
    interestRate: 10,
    tenure: 12,
    startDate: new Date(),
    repaymentFrequency: 'Monthly'
  }

}