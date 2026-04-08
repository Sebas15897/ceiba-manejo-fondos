import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { BTG_FUNDS_CATALOG } from '../constants/funds-catalog.constants';
import type { IDefaultResponse } from '../interfaces/default-response.interface';
import type { IFund } from '../interfaces/fund.interface';
import type { IHttpMockOptions } from '../interfaces/http.interface';

/**
 * API REST simulada: catálogo de fondos con latencia opcional y fallo controlado.
 */
@Injectable({ providedIn: 'root' })
export class FundsApiService {
  getFunds(options?: IHttpMockOptions): Observable<IDefaultResponse<IFund[]>> {
    const delayMs = options?.delayMs ?? 900;

    if (options?.fail) {
      return throwError(
        () => new Error('Error simulado al consultar el catálogo de fondos.'),
      ).pipe(delay(delayMs));
    }

    return of({
      data: [...BTG_FUNDS_CATALOG],
      message: 'OK',
    }).pipe(delay(delayMs));
  }
}
