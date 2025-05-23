import { Routes } from "@angular/router";
import { LayoutComponent } from "../shared/layout/layout/layout.component";
import { DashboardComponent } from "../pages/data-visualization/dashboard/dashboard.component";
import { BarChartComponent } from "../pages/data-visualization/bar-chart/bar-chart.component";
import { LineChartComponent } from "../pages/data-visualization/line-chart/line-chart.component";
import { GeoChartComponent } from "../pages/data-visualization/geo-chart/geo-chart.component";
import { SuccessFailureChartComponent } from "../pages/data-visualization/success-failure-chart/success-failure-chart.component";



export const dataVisualizationRoutes: Routes = [
  {
    path: 'dataview',
    component: LayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'bar-chart', component: BarChartComponent },
      { path: 'line-chart', component: LineChartComponent },
      { path: 'geo-chart', component: GeoChartComponent },
      { path: 'success-failure-chart', component: SuccessFailureChartComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      
    ]
   }
];