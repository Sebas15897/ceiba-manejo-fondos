import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly items = signal<ToastItem[]>([]);

  /** Lista actual de toasts (solo lectura en plantillas). */
  readonly toasts = this.items.asReadonly();

  push(message: string, type: ToastType = 'info', durationMs = 4200): void {
    const id = crypto.randomUUID();
    this.items.update((list) => [...list, { id, message, type }]);
    globalThis.setTimeout(() => this.dismiss(id), durationMs);
  }

  success(message: string): void {
    this.push(message, 'success');
  }

  info(message: string): void {
    this.push(message, 'info');
  }

  warning(message: string): void {
    this.push(message, 'warning', 5200);
  }

  dismiss(id: string): void {
    this.items.update((list) => list.filter((t) => t.id !== id));
  }
}
