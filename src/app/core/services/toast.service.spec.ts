import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('debe agregar un toast y eliminarlo tras el tiempo configurado', () => {
    service.push('Mensaje de prueba', 'info', 3000);
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].message).toBe('Mensaje de prueba');

    jest.advanceTimersByTime(3000);
    expect(service.toasts().length).toBe(0);
  });

  it('success debe usar tipo success', () => {
    service.success('OK');
    expect(service.toasts()[0].type).toBe('success');
  });

  it('dismiss debe quitar un toast por id', () => {
    service.info('A');
    const id = service.toasts()[0].id;
    service.dismiss(id);
    expect(service.toasts().length).toBe(0);
  });
});
