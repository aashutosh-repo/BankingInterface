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

export const routes: Routes = [
    {path : '', component: LoginComponent},
    {path : 'login' , component: LoginComponent},
    {path : 'homepage' , component: HomepageComponent},
    {path : 'main', component: TilesComponent},
    { path: '', redirectTo: '/allAccountsHome', pathMatch: 'full' },
    { path: 'ticket', component: FlightTicketComponent },
    { path: 'flightresult', component: FlightSearchResultComponent },
    ...accountRoutes,
    ...customerRoutes,
    ...paymentRoutes,
    ...toolsRoutes,
    {path : '**', redirectTo: '/login', pathMatch: 'full'},

];
