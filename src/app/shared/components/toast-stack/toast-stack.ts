import { Component, inject } from '@angular/core';

import { ToastService, type ToastItem } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-stack',
  imports: [],
  templateUrl: './toast-stack.html',
  styleUrl: './toast-stack.scss',
})
export class ToastStack {
  private readonly toastService = inject(ToastService);

  protected readonly toasts = this.toastService.toasts;

  protected dismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  protected rowClass(t: ToastItem): string {
    const base =
      'pointer-events-auto flex items-start gap-3 rounded-xl border border-slate-200 py-3 pl-3 pr-2 shadow-lg border-l-4 ';
    switch (t.type) {
      case 'success':
        return base + 'border-l-emerald-500 bg-white';
      case 'warning':
        return base + 'border-l-amber-500 bg-white';
      default:
        return base + 'border-l-[var(--color-brand)] bg-white';
    }
  }
}
