/** Participación activa del usuario en un fondo. */
export interface IPortfolioPosition {
  fundId: number;
  fundName: string;
  investedAmount: number;
  subscribedAt: string;
}
