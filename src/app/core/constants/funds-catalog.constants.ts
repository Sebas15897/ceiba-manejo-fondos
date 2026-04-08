import type { IFund } from '../interfaces/fund.interface';

/** Saldo inicial del usuario único (requisito del enunciado). */
export const INITIAL_WALLET_BALANCE_COP = 500_000;

/** Catálogo de fondos según tabla del PDF. */
export const BTG_FUNDS_CATALOG: readonly IFund[] = [
  {
    id: 1,
    name: 'FPV_BTG_PACTUAL_RECAUDADORA',
    minimumAmount: 75_000,
    category: 'FPV',
  },
  {
    id: 2,
    name: 'FPV_BTG_PACTUAL_ECOPETROL',
    minimumAmount: 125_000,
    category: 'FPV',
  },
  {
    id: 3,
    name: 'DEUDAPRIVADA',
    minimumAmount: 50_000,
    category: 'FIC',
  },
  {
    id: 4,
    name: 'FDO-ACCIONES',
    minimumAmount: 250_000,
    category: 'FIC',
  },
  {
    id: 5,
    name: 'FPV_BTG_PACTUAL_DINAMICA',
    minimumAmount: 100_000,
    category: 'FPV',
  },
];
