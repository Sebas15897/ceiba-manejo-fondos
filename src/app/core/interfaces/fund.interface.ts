/** Fondo FPV/FIC disponible para suscripción (catálogo). */
export interface IFund {
  id: number;
  name: string;
  minimumAmount: number;
  category: IFundCategory;
}

/** Categoría de fondo según negocio BTG. */
export type IFundCategory = 'FPV' | 'FIC';
