import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { catchError, EMPTY, tap } from 'rxjs';

import { FundsApiService } from '../../../core/services/funds-api.service';
import {
  CancelParticipation,
  ClearFundsError,
  LoadFunds,
  SubscribeToFund,
} from './funds.actions';
import { FUNDS_STATE_DEFAULTS, type FundsStateModel } from './funds.state.model';
import type { ITransaction } from '../../../core/interfaces/transaction.interface';
import type { IPortfolioPosition } from '../../../core/interfaces/portfolio-position.interface';

@State<FundsStateModel>({
  name: 'funds',
  defaults: FUNDS_STATE_DEFAULTS,
})
@Injectable()
export class FundsState implements NgxsOnInit {
  constructor(private readonly fundsApi: FundsApiService) {}

  ngxsOnInit(ctx: StateContext<FundsStateModel>): void {
    ctx.dispatch(new LoadFunds());
  }

  @Selector()
  static balance(state: FundsStateModel): number {
    return state.balance;
  }

  @Selector()
  static catalog(state: FundsStateModel) {
    return state.catalog;
  }

  @Selector()
  static positions(state: FundsStateModel) {
    return state.positions;
  }

  @Selector()
  static transactions(state: FundsStateModel) {
    return state.transactions;
  }

  @Selector()
  static loading(state: FundsStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static lastError(state: FundsStateModel): string | null {
    return state.lastError;
  }

  @Action(LoadFunds)
  loadFunds(ctx: StateContext<FundsStateModel>) {
    ctx.patchState({ loading: true, lastError: null });

    return this.fundsApi.getFunds().pipe(
      tap((res) =>
        ctx.patchState({
          catalog: res.data,
          loading: false,
        }),
      ),
      catchError(() => {
        ctx.patchState({
          loading: false,
          lastError:
            'No se pudo cargar el catálogo de fondos. Por favor intente de nuevo.',
        });
        return EMPTY;
      }),
    );
  }

  @Action(ClearFundsError)
  clearError(ctx: StateContext<FundsStateModel>) {
    ctx.patchState({ lastError: null });
  }

  @Action(SubscribeToFund)
  subscribe(ctx: StateContext<FundsStateModel>, action: SubscribeToFund) {
    const state = ctx.getState();
    const { fundId, amount, notificationMethod } = action.payload;
    const fund = state.catalog.find((f) => f.id === fundId);

    if (!fund) {
      ctx.patchState({ lastError: 'Fondo no encontrado.' });
      return;
    }

    if (state.positions.some((p) => p.fundId === fundId)) {
      ctx.patchState({
        lastError: 'Ya tiene una suscripción activa en este fondo.',
      });
      return;
    }

    if (amount < fund.minimumAmount) {
      ctx.patchState({
        lastError: `El monto mínimo para este fondo es ${fund.minimumAmount.toLocaleString('es-CO')} COP.`,
      });
      return;
    }

    if (amount > state.balance) {
      ctx.patchState({
        lastError: 'Saldo insuficiente para realizar la suscripción.',
      });
      return;
    }

    const subscribedAt = new Date().toISOString();
    const position: IPortfolioPosition = {
      fundId: fund.id,
      fundName: fund.name,
      investedAmount: amount,
      subscribedAt,
    };

    const transaction: ITransaction = {
      id: crypto.randomUUID(),
      fundId: fund.id,
      fundName: fund.name,
      type: 'subscription',
      amount,
      notificationMethod,
      createdAt: subscribedAt,
    };

    ctx.setState({
      ...state,
      balance: state.balance - amount,
      positions: [...state.positions, position],
      transactions: [transaction, ...state.transactions],
      lastError: null,
    });
  }

  @Action(CancelParticipation)
  cancel(ctx: StateContext<FundsStateModel>, action: CancelParticipation) {
    const state = ctx.getState();
    const position = state.positions.find((p) => p.fundId === action.fundId);

    if (!position) {
      ctx.patchState({
        lastError: 'No tiene participación activa en este fondo.',
      });
      return;
    }

    const createdAt = new Date().toISOString();
    const transaction: ITransaction = {
      id: crypto.randomUUID(),
      fundId: position.fundId,
      fundName: position.fundName,
      type: 'cancellation',
      amount: position.investedAmount,
      createdAt,
    };

    ctx.setState({
      ...state,
      balance: state.balance + position.investedAmount,
      positions: state.positions.filter((p) => p.fundId !== action.fundId),
      transactions: [transaction, ...state.transactions],
      lastError: null,
    });
  }
}
