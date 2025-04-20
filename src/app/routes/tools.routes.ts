import { Routes } from '@angular/router';
import { EmiCalculatorComponent } from '../pages/emi-calculator/emi-calculator.component';
import { TestComponent } from '../pages/test/test.component';

export const toolsRoutes: Routes = [
  { path: 'emi', component: EmiCalculatorComponent },
  { path: 'test', component: TestComponent }
];
