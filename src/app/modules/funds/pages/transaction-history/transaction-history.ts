import { DatePipe, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

import { NotificationMethod } from '../../../../core/enums/notification-method.enum';
import type { ITransaction } from '../../../../core/interfaces/transaction.interface';

@Component({
  selector: 'app-transaction-history',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.scss',
})
export class TransactionHistory {
  /** Movimientos mock; luego `FundsState.transactions`. */
  protected readonly transactions: ITransaction[] = [
    {
      id: '1',
      fundId: 3,
      fundName: 'DEUDAPRIVADA',
      type: 'subscription',
      amount: 50_000,
      notificationMethod: NotificationMethod.Email,
      createdAt: '2026-04-05T14:30:00.000Z',
    },
    {
      id: '2',
      fundId: 2,
      fundName: 'FPV_BTG_PACTUAL_ECOPETROL',
      type: 'cancellation',
      amount: 125_000,
      createdAt: '2026-04-04T09:15:00.000Z',
    },
    {
      id: '3',
      fundId: 1,
      fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
      type: 'subscription',
      amount: 100_000,
      notificationMethod: NotificationMethod.Sms,
      createdAt: '2026-04-06T10:00:00.000Z',
    },
  ];

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
