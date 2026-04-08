import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AlertBanner } from '../../alert-banner/alert-banner';
import { Header } from '../header/header';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Header, AlertBanner],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
})
export class AppShell {
  /** Mensaje global mock; conectar a NGXS `lastError` después. */
  protected readonly bannerMessage = signal<string | null>(null);

  protected onBannerDismiss(): void {
    this.bannerMessage.set(null);
  }
}
