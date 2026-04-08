import { DecimalPipe } from '@angular/common';
import { Component, inject, signal, type Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngxs/store';

import { FundsState } from '../../../../modules/funds/state/funds.state';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, DecimalPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly store = inject(Store);

  protected readonly balance = this.store.selectSignal(FundsState.balance) as Signal<number>;

  protected readonly menuOpen = signal(false);

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open: boolean) => !open);
  }
}
