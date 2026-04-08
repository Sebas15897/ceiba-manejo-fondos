/** Opciones comunes para llamadas HTTP simuladas (delay, forzar error, etc.). */
export interface IHttpMockOptions {
  delayMs?: number;
  fail?: boolean;
}
