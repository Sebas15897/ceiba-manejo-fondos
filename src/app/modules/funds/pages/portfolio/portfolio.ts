import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, type Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';

import type { IPortfolioPosition } from '../../../../core/interfaces/portfolio-position.interface';
import { CancelParticipation } from '../../state/funds.actions';
import { FundsState } from '../../state/funds.state';

@Component({
  selector: 'app-portfolio',
  imports: [DecimalPipe, DatePipe, RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  private readonly store = inject(Store);

  protected readonly positions = this.store.selectSignal(FundsState.positions) as Signal<
    IPortfolioPosition[]
  >;

  protected cancel(fundId: number): void {
    this.store.dispatch(new CancelParticipation(fundId));
  }
}
