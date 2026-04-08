import { INITIAL_WALLET_BALANCE_COP } from '../../../core/constants/funds-catalog.constants';
import type { IFund } from '../../../core/interfaces/fund.interface';
import type { IPortfolioPosition } from '../../../core/interfaces/portfolio-position.interface';
import type { ITransaction } from '../../../core/interfaces/transaction.interface';

export interface FundsStateModel {
  balance: number;
  catalog: IFund[];
  positions: IPortfolioPosition[];
  transactions: ITransaction[];
  loading: boolean;
  /** Simula latencia de backend en suscripción / cancelación. */
  operationLoading: boolean;
  lastError: string | null;
}

export const FUNDS_STATE_DEFAULTS: FundsStateModel = {
  balance: INITIAL_WALLET_BALANCE_COP,
  catalog: [],
  positions: [],
  transactions: [],
  loading: false,
  operationLoading: false,
  lastError: null,
};
