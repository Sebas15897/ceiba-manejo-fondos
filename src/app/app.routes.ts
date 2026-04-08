import { Routes } from '@angular/router';

import { AppShell } from './shared/components/layout/app-shell/app-shell';

export const routes: Routes = [
  {
    path: '',
    component: AppShell,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/funds/funds.routes').then((m) => m.fundsRoutes),
      },
    ],
  },
];
