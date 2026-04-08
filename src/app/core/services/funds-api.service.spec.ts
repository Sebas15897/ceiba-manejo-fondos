import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { BTG_FUNDS_CATALOG } from '../constants/funds-catalog.constants';
import { FundsApiService } from './funds-api.service';

describe('FundsApiService', () => {
  let service: FundsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundsApiService);
  });

  it('debe devolver el catálogo BTG en data', async () => {
    const res = await firstValueFrom(service.getFunds({ delayMs: 0 }));
    expect(res.data.length).toBe(BTG_FUNDS_CATALOG.length);
    expect(res.data[0].id).toBe(BTG_FUNDS_CATALOG[0].id);
  });

  it('debe propagar error cuando fail es true', async () => {
    await expect(
      firstValueFrom(service.getFunds({ delayMs: 0, fail: true })),
    ).rejects.toThrow();
  });
});
