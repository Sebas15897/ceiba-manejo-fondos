import type { NotificationMethod } from '../../../core/enums/notification-method.enum';

const scope = '[Funds]';

/** Carga el catálogo desde la API simulada. */
export class LoadFunds {
  static readonly type = `${scope} Load catalog`;
}

/** Limpia el mensaje de error en pantalla. */
export class ClearFundsError {
  static readonly type = `${scope} Clear error`;
}

export class SubscribeToFund {
  static readonly type = `${scope} Subscribe`;

  constructor(
    public readonly payload: {
      fundId: number;
      amount: number;
      notificationMethod: NotificationMethod;
    },
  ) {}
}

export class CancelParticipation {
  static readonly type = `${scope} Cancel participation`;

  constructor(public readonly fundId: number) {}
}
