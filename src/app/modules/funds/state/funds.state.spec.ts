import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { firstValueFrom, of, throwError } from 'rxjs';

import { BTG_FUNDS_CATALOG } from '../../../core/constants/funds-catalog.constants';
import { FundsApiService } from '../../../core/services/funds-api.service';
import { NotificationMethod } from '../../../core/enums/notification-method.enum';
import {
  CancelParticipation,
  LoadFunds,
  SubscribeToFund,
} from './funds.actions';
import { FundsState } from './funds.state';

describe('FundsState', () => {
  describe('con API exitosa (incl. ngxsOnInit)', () => {
    let store: Store;
    let api: { getFunds: jest.Mock };

    beforeEach(() => {
      api = {
        getFunds: jest.fn(() =>
          of({ data: [...BTG_FUNDS_CATALOG], message: 'OK' }),
        ),
      };

      TestBed.configureTestingModule({
        providers: [
          provideStore([FundsState]),
          { provide: FundsApiService, useValue: api },
        ],
      });

      store = TestBed.inject(Store);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('LoadFunds debe dejar el catálogo con los fondos BTG', async () => {
      await firstValueFrom(store.dispatch(new LoadFunds()));
      expect(store.selectSnapshot(FundsState.catalog).length).toBe(
        BTG_FUNDS_CATALOG.length,
      );
      expect(store.selectSnapshot(FundsState.loading)).toBe(false);
    });

    it('SubscribeToFund debe descontar saldo y crear posición (tras timer simulado)', async () => {
      jest.useFakeTimers();
      const balanceBefore = store.selectSnapshot(FundsState.balance);
      const done = firstValueFrom(
        store.dispatch(
          new SubscribeToFund({
            fundId: 3,
            amount: 50_000,
            notificationMethod: NotificationMethod.Email,
          }),
        ),
      );
      jest.advanceTimersByTime(900);
      await done;

      expect(store.selectSnapshot(FundsState.balance)).toBe(balanceBefore - 50_000);
      expect(
        store.selectSnapshot(FundsState.positions).some((p) => p.fundId === 3),
      ).toBe(true);
      expect(store.selectSnapshot(FundsState.transactions)[0].type).toBe(
        'subscription',
      );
    });

    it('SubscribeToFund no debe permitir saldo insuficiente', async () => {
      jest.useFakeTimers();
      const balance = store.selectSnapshot(FundsState.balance);
      const done = firstValueFrom(
        store.dispatch(
          new SubscribeToFund({
            fundId: 1,
            amount: balance + 1,
            notificationMethod: NotificationMethod.Sms,
          }),
        ),
      );
      jest.advanceTimersByTime(900);
      await done;

      expect(store.selectSnapshot(FundsState.lastError)).toContain(
        'Saldo insuficiente',
      );
    });

    it('CancelParticipation debe devolver el monto al saldo', async () => {
      jest.useFakeTimers();
      const balanceStart = store.selectSnapshot(FundsState.balance);
      let done = firstValueFrom(
        store.dispatch(
          new SubscribeToFund({
            fundId: 3,
            amount: 50_000,
            notificationMethod: NotificationMethod.Email,
          }),
        ),
      );
      jest.advanceTimersByTime(900);
      await done;

      const balanceWithPosition = store.selectSnapshot(FundsState.balance);
      expect(balanceWithPosition).toBe(balanceStart - 50_000);

      done = firstValueFrom(store.dispatch(new CancelParticipation(3)));
      jest.advanceTimersByTime(900);
      await done;

      expect(store.selectSnapshot(FundsState.balance)).toBe(balanceStart);
      expect(
        store.selectSnapshot(FundsState.positions).find((p) => p.fundId === 3),
      ).toBeUndefined();
    });
  });

  describe('con API en error desde el inicio', () => {
    let store: Store;

    beforeEach(() => {
      const api = {
        getFunds: jest.fn(() =>
          throwError(() => new Error('Error de red simulado')),
        ),
      };

      TestBed.configureTestingModule({
        providers: [
          provideStore([FundsState]),
          { provide: FundsApiService, useValue: api },
        ],
      });

      store = TestBed.inject(Store);
    });

    it('LoadFunds (ngxsOnInit + manual) debe dejar lastError y catálogo vacío', async () => {
      expect(store.selectSnapshot(FundsState.lastError)).toBeTruthy();
      expect(store.selectSnapshot(FundsState.catalog).length).toBe(0);

      await firstValueFrom(store.dispatch(new LoadFunds()));
      expect(store.selectSnapshot(FundsState.lastError)).toBeTruthy();
      expect(store.selectSnapshot(FundsState.catalog).length).toBe(0);
    });
  });
});
