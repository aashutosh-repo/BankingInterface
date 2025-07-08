import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TilesComponent } from './pages/tiles/tiles.component';
import { FlightTicketComponent } from './pages/Ticketing/flight-ticket/flight-ticket.component';
import { FlightSearchResultComponent } from './pages/Ticketing/flight-search-result/flight-search-result.component';
import { accountRoutes } from './routes/account.routes';
import { customerRoutes } from './routes/customer.routes';
import { paymentRoutes } from './routes/payment.routes';
import { toolsRoutes } from './routes/tools.routes';
import { BarChartComponent } from './pages/data-visualization/bar-chart/bar-chart.component';
import { DashboardComponent } from './pages/data-visualization/dashboard/dashboard.component';
import { dataVisualizationRoutes } from './routes/data-visualization.route';
import { SipCalculatorComponent } from './pages/instruments/sip-calculator/sip-calculator.component';
import { TestComponent } from './pages/test/test.component';

export const routes: Routes = [
    {path : '', component: LoginComponent},
    {path : 'test', component: TestComponent},
    {path : 'login' , component: LoginComponent},
    {path : 'homepage' , component: HomepageComponent},
    {path : 'main', component: TilesComponent},
    { path: 'ticket', component: FlightTicketComponent },
    { path: 'flightresult', component: FlightSearchResultComponent },
    {path: 'sip', component: SipCalculatorComponent},
    {path: 'chart', component: BarChartComponent},
    ...accountRoutes,
    ...customerRoutes,
    ...paymentRoutes,
    ...toolsRoutes,
    ...dataVisualizationRoutes,
    {path : '**', redirectTo: '/login', pathMatch: 'full'},

];
