import { DatePipe, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { IPortfolioPosition } from '../../../../core/interfaces/portfolio-position.interface';

@Component({
  selector: 'app-portfolio',
  imports: [DecimalPipe, DatePipe, RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  /** Posiciones mock; luego `FundsState.positions`. */
  protected readonly positions: IPortfolioPosition[] = [
    {
      fundId: 3,
      fundName: 'DEUDAPRIVADA',
      investedAmount: 50_000,
      subscribedAt: '2026-04-05T14:30:00.000Z',
    },
    {
      fundId: 1,
      fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
      investedAmount: 100_000,
      subscribedAt: '2026-04-06T10:00:00.000Z',
    },
  ];

  protected cancelMock(fundName: string): void {
    // Solo UI: luego `dispatch(CancelParticipation)`.
    void fundName;
  }
}
