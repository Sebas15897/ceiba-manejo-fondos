import type { NotificationMethod } from '../enums/notification-method.enum';

/** Tipo de movimiento en el historial. */
export type ITransactionType = 'subscription' | 'cancellation';

/** Registro de suscripción o cancelación. */
export interface ITransaction {
  id: string;
  fundId: number;
  fundName: string;
  type: ITransactionType;
  amount: number;
  /** Solo aplica a suscripciones. */
  notificationMethod?: NotificationMethod;
  createdAt: string;
}
