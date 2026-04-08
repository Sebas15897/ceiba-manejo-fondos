import { Component, inject, type Signal } from '@angular/core';
import { Store } from '@ngxs/store';

import { FundsState } from '../../../modules/funds/state/funds.state';

@Component({
  selector: 'app-global-loading-overlay',
  imports: [],
  templateUrl: './global-loading-overlay.html',
  styleUrl: './global-loading-overlay.scss',
})
export class GlobalLoadingOverlay {
  private readonly store = inject(Store);

  protected readonly loading = this.store.selectSignal(FundsState.loading) as Signal<boolean>;
  protected readonly operationLoading = this.store.selectSignal(
    FundsState.operationLoading,
  ) as Signal<boolean>;

  protected readonly blocking = this.store.selectSignal(FundsState.blockingUi) as Signal<boolean>;
}

