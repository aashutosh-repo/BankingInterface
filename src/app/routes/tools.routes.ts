import { Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout/layout.component';
import { InstrumentsHomeComponent } from '../pages/instruments/instruments-home/instruments-home.component';

export const toolsRoutes: Routes = [
  {
    path: 'instruments',
    component: LayoutComponent, // includes the header
    children: [
      {
        path: '',
        // component: SidebarLayoutComponent, // includes the sidebar
        children: [
          { path: 'home', component: InstrumentsHomeComponent },
          { path: 'emi-calculator', loadComponent: () => import('../pages/instruments/emi-calculator/emi-calculator.component').then(m => m.EmiCalculatorComponent) },
          { path: 'sip-calc', loadComponent: () => import('../pages/instruments/sip-calculator/sip-calculator.component').then(m => m.SipCalculatorComponent) },
          { path: 'currency-convertor', loadComponent: () => import('../pages/instruments/currency-convertor/currency-convertor.component').then(m => m.CurrencyConvertorComponent) },
          { path: 'holiday-calendar', loadComponent: () => import('../pages/instruments/holidays-calender/holidays-calender.component').then(m => m.HolidaysCalenderComponent) },
        ]
      }
    ]
  }
];
