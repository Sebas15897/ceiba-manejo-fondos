import { DecimalPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, DecimalPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  /** Saldo mock solo para maquetación; luego vendrá del store. */
  protected readonly mockBalanceCop = 500_000;

  protected readonly menuOpen = signal(false);

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open: boolean) => !open);
  }
}
