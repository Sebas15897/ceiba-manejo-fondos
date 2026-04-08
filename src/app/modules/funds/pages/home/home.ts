import { DecimalPipe } from '@angular/common';
import { Component, inject, type Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';

import type { IFund } from '../../../../core/interfaces/fund.interface';
import type { IPortfolioPosition } from '../../../../core/interfaces/portfolio-position.interface';
import { FundsState } from '../../state/funds.state';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly store = inject(Store);

  protected readonly balance = this.store.selectSignal(FundsState.balance) as Signal<number>;
  protected readonly positions = this.store.selectSignal(FundsState.positions) as Signal<
    IPortfolioPosition[]
  >;
  protected readonly catalog = this.store.selectSignal(FundsState.catalog) as Signal<IFund[]>;
}
