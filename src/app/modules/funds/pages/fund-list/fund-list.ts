import { DecimalPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

import { BTG_FUNDS_CATALOG } from '../../../../core/constants/funds-catalog.constants';
import type { IFund } from '../../../../core/interfaces/fund.interface';
import { SubscribeFundModal } from '../../components/subscribe-fund-modal/subscribe-fund-modal';

@Component({
  selector: 'app-fund-list',
  imports: [DecimalPipe, SubscribeFundModal],
  templateUrl: './fund-list.html',
  styleUrl: './fund-list.scss',
})
export class FundList {
  /** Catálogo estático para maquetación; luego será el selector NGXS. */
  protected readonly funds = BTG_FUNDS_CATALOG;

  protected readonly subscribeTarget = signal<IFund | null>(null);

  protected openSubscribe(fund: IFund): void {
    this.subscribeTarget.set(fund);
  }

  protected closeSubscribe(): void {
    this.subscribeTarget.set(null);
  }

  protected categoryClass(category: string): string {
    return category === 'FPV'
      ? 'bg-blue-100 text-[var(--color-fpv)]'
      : 'bg-violet-100 text-[var(--color-fic)]';
  }
}
