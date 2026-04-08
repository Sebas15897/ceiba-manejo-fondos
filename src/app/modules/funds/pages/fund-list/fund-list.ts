import { DecimalPipe } from '@angular/common';
import { Component, inject, signal, type Signal } from '@angular/core';
import { Store } from '@ngxs/store';

import type { IFund } from '../../../../core/interfaces/fund.interface';
import type { IPortfolioPosition } from '../../../../core/interfaces/portfolio-position.interface';
import { SubscribeFundModal } from '../../components/subscribe-fund-modal/subscribe-fund-modal';
import { ClearFundsError, LoadFunds } from '../../state/funds.actions';
import { FundsState } from '../../state/funds.state';

@Component({
  selector: 'app-fund-list',
  imports: [DecimalPipe, SubscribeFundModal],
  templateUrl: './fund-list.html',
  styleUrl: './fund-list.scss',
})
export class FundList {
  private readonly store = inject(Store);

  protected readonly funds = this.store.selectSignal(FundsState.catalog) as Signal<IFund[]>;
  protected readonly loading = this.store.selectSignal(FundsState.loading) as Signal<boolean>;
  protected readonly positions = this.store.selectSignal(FundsState.positions) as Signal<
    IPortfolioPosition[]
  >;

  protected readonly subscribeTarget = signal<IFund | null>(null);

  protected retryLoad(): void {
    this.store.dispatch(new LoadFunds());
  }

  protected openSubscribe(fund: IFund): void {
    this.store.dispatch(new ClearFundsError());
    this.subscribeTarget.set(fund);
  }

  protected closeSubscribe(): void {
    this.subscribeTarget.set(null);
  }

  protected isSubscribed(fundId: number): boolean {
    return this.positions().some((p) => p.fundId === fundId);
  }

  protected categoryClass(category: string): string {
    return category === 'FPV'
      ? 'bg-blue-100 text-[var(--color-fpv)]'
      : 'bg-violet-100 text-[var(--color-fic)]';
  }
}
