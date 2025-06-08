import { Routes } from '@angular/router';
import { EmiCalculatorComponent } from '../pages/instruments/emi-calculator/emi-calculator.component';
import { LayoutComponent } from '../shared/layout/layout/layout.component';
import { CurrencyConvertorComponent } from '../pages/instruments/currency-convertor/currency-convertor.component';
import { HolidaysCalenderComponent } from '../pages/instruments/holidays-calender/holidays-calender.component';
import { SidebarLayoutComponent } from '../shared/layout/sidebar-layout/sidebar-layout.component';
import { SipCalculatorComponent } from '../pages/instruments/sip-calculator/sip-calculator.component';

export const toolsRoutes: Routes = [
  {
    path: 'instruments',
    component: LayoutComponent, // includes the header
    children: [
      {
        path: '',
        component: SidebarLayoutComponent, // includes the sidebar
        children: [
          { path: 'emi-calculator', component: EmiCalculatorComponent },
          { path: 'sip-calc', component: SipCalculatorComponent },
          { path: 'currency-convertor', component: CurrencyConvertorComponent },
          { path: 'holiday-calendar', component: HolidaysCalenderComponent },
          // { path: '', redirectTo: 'sip-calculator', pathMatch: 'full' }
        ]
      }
    ]
  }
];
