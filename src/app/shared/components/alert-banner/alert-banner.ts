import { Component, input, output } from '@angular/core';

/** Banner de error o aviso; solo presentación (mensaje vendrá del state más adelante). */
@Component({
  selector: 'app-alert-banner',
  imports: [],
  templateUrl: './alert-banner.html',
  styleUrl: './alert-banner.scss',
})
export class AlertBanner {
  /** Si es null o vacío, no se renderiza el banner. */
  readonly message = input<string | null>(null);

  readonly dismissed = output<void>();

  protected dismiss(): void {
    this.dismissed.emit();
  }
}
