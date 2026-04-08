import { DecimalPipe } from '@angular/common';
import { Component, effect, inject, input, output, signal, type Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { NotificationMethod } from '../../../../core/enums/notification-method.enum';
import type { IFund } from '../../../../core/interfaces/fund.interface';
import { SubscribeToFund } from '../../state/funds.actions';
import { FundsState } from '../../state/funds.state';

@Component({
  selector: 'app-subscribe-fund-modal',
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './subscribe-fund-modal.html',
  styleUrl: './subscribe-fund-modal.scss',
})
export class SubscribeFundModal {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  readonly fund = input.required<IFund>();
  readonly closed = output<void>();

  protected readonly balance = this.store.selectSignal(FundsState.balance) as Signal<number>;

  protected readonly NotificationMethod = NotificationMethod;

  protected readonly form = this.fb.nonNullable.group({
    amount: this.fb.control<number | null>(null, Validators.required),
    notificationMethod: this.fb.nonNullable.control(NotificationMethod.Email),
  });

  protected readonly submitting = signal(false);

  constructor() {
    effect(() => {
      const f = this.fund();
      const bal = this.balance();
      const amountCtrl = this.form.controls.amount;
      amountCtrl.setValidators([
        Validators.required,
        Validators.min(f.minimumAmount),
        Validators.max(bal),
      ]);
      amountCtrl.setValue(f.minimumAmount);
      this.form.controls.notificationMethod.setValue(NotificationMethod.Email);
      amountCtrl.markAsUntouched();
      amountCtrl.updateValueAndValidity();
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const f = this.fund();
    const raw = this.form.getRawValue();
    this.submitting.set(true);

    this.store
      .dispatch(
        new SubscribeToFund({
          fundId: f.id,
          amount: Number(raw.amount),
          notificationMethod: raw.notificationMethod,
        }),
      )
      .subscribe({
        complete: () => {
          this.submitting.set(false);
          const err = this.store.selectSnapshot(FundsState.lastError);
          if (!err) {
            this.close();
          }
        },
      });
  }
}
