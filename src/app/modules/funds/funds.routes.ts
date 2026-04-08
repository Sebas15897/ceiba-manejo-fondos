import { Routes } from '@angular/router';

import { FundList } from './pages/fund-list/fund-list';
import { Home } from './pages/home/home';
import { Portfolio } from './pages/portfolio/portfolio';
import { TransactionHistory } from './pages/transaction-history/transaction-history';

export const fundsRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home, title: 'Inicio' },
  { path: 'funds', component: FundList, title: 'Fondos disponibles' },
  { path: 'portfolio', component: Portfolio, title: 'Mi cartera' },
  { path: 'transactions', component: TransactionHistory, title: 'Historial' },
];
