import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, type Signal } from '@angular/core';
import { Store } from '@ngxs/store';

import { NotificationMethod } from '../../../../core/enums/notification-method.enum';
import type { ITransaction } from '../../../../core/interfaces/transaction.interface';
import { FundsState } from '../../state/funds.state';

@Component({
  selector: 'app-transaction-history',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.scss',
})
export class TransactionHistory {
  private readonly store = inject(Store);

  protected readonly transactions = this.store.selectSignal(FundsState.transactions) as Signal<
    ITransaction[]
  >;

  protected typeLabel(type: ITransaction['type']): string {
    return type === 'subscription' ? 'Suscripción' : 'Cancelación';
  }

  protected typeClass(type: ITransaction['type']): string {
    return type === 'subscription'
      ? 'bg-emerald-100 text-emerald-800'
      : 'bg-slate-200 text-slate-800';
  }

  protected notifyLabel(method: NotificationMethod | undefined): string {
    if (!method) {
      return '—';
    }
    return method === NotificationMethod.Email ? 'Email' : 'SMS';
  }
}
