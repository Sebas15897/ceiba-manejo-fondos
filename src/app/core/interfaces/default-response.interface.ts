/** Respuesta genérica para API REST simulada / mocks. */
export interface IDefaultResponse<T> {
  data: T;
  message?: string;
}
