import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FundsUiFeedbackService } from './modules/funds/services/funds-ui-feedback.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('btg-fondos');

  /** Activa escucha de acciones para toasts (side effect en root). */
  private readonly _fundsUiFeedback = inject(FundsUiFeedbackService);
}
