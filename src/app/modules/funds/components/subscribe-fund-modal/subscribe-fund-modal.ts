import { DecimalPipe } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NotificationMethod } from '../../../../core/enums/notification-method.enum';
import type { IFund } from '../../../../core/interfaces/fund.interface';

/**
 * Modal de suscripción: solo maquetación y campos locales.
 * La validación y el dispatch al store se conectarán después.
 */
@Component({
  selector: 'app-subscribe-fund-modal',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './subscribe-fund-modal.html',
  styleUrl: './subscribe-fund-modal.scss',
})
export class SubscribeFundModal {
  readonly fund = input.required<IFund>();

  readonly closed = output<void>();

  protected readonly NotificationMethod = NotificationMethod;

  protected amount = 0;
  protected notificationMethod: NotificationMethod = NotificationMethod.Email;

  constructor() {
    effect(() => {
      const f = this.fund();
      this.amount = f.minimumAmount;
      this.notificationMethod = NotificationMethod.Email;
    });
  }

  protected close(): void {
    this.closed.emit();
  }

  protected onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).dataset['backdrop'] === 'true') {
      this.close();
    }
  }

  protected submit(): void {
    // Diseño: solo cierra; luego se enlaza al formulario reactivo + NGXS.
    this.close();
  }
}
