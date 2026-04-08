import { Injectable, inject } from '@angular/core';
import { Actions, ofActionCompleted, Store } from '@ngxs/store';
import { filter, tap } from 'rxjs';

import { ToastService } from '../../../core/services/toast.service';
import {
  CancelParticipation,
  LoadFunds,
  SubscribeToFund,
} from '../state/funds.actions';
import { FundsState } from '../state/funds.state';

/**
 * Reacciona a acciones NGXS para toasts de confirmación (sin acoplar el state a la UI).
 */
@Injectable({ providedIn: 'root' })
export class FundsUiFeedbackService {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly toast = inject(ToastService);

  constructor() {
    this.actions$
      .pipe(
        ofActionCompleted(LoadFunds),
        filter(
          () =>
            !this.store.selectSnapshot(FundsState.lastError) &&
            this.store.selectSnapshot(FundsState.catalog).length > 0,
        ),
        tap(() => this.toast.info('Catálogo de fondos actualizado correctamente.')),
      )
      .subscribe();

    this.actions$
      .pipe(
        ofActionCompleted(SubscribeToFund),
        filter(() => !this.store.selectSnapshot(FundsState.lastError)),
        tap(() =>
          this.toast.success(
            'Suscripción registrada. Puede verla en Cartera e Historial.',
          ),
        ),
      )
      .subscribe();

    this.actions$
      .pipe(
        ofActionCompleted(CancelParticipation),
        filter(() => !this.store.selectSnapshot(FundsState.lastError)),
        tap(() =>
          this.toast.success('Participación cancelada. Su saldo fue actualizado.'),
        ),
      )
      .subscribe();
  }
}
