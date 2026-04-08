import { Component, inject, type Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';

import { ClearFundsError } from '../../../../modules/funds/state/funds.actions';
import { FundsState } from '../../../../modules/funds/state/funds.state';
import { GlobalLoadingOverlay } from '../../global-loading-overlay/global-loading-overlay';
import { ToastStack } from '../../toast-stack/toast-stack';
import { AlertBanner } from '../../alert-banner/alert-banner';
import { Header } from '../header/header';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Header, AlertBanner, ToastStack, GlobalLoadingOverlay],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
})
export class AppShell {
  private readonly store = inject(Store);

  protected readonly bannerMessage = this.store.selectSignal(
    FundsState.lastError,
  ) as Signal<string | null>;

  protected onBannerDismiss(): void {
    this.store.dispatch(new ClearFundsError());
  }
}
