import { Component, input, output, signal } from '@angular/core';
import { Movimiento } from '../../modelos/movimiento';

@Component({
  selector: 'app-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.html',
  styleUrl: './nuevo-movimiento.css'
})
export class NuevoMovimiento {
  
  saldoActual = input.required<number>();

  
  movimientoValido = output<Movimiento>();

  
  tipo = signal<'Recarga' | 'Gasto'>('Gasto');
  monto = signal<number | null>(null);
  error = signal<string | null>(null);

  actualizarTipo(evento: Event) {
    const valor = (evento.target as HTMLSelectElement).value as 'Recarga' | 'Gasto';
    this.tipo.set(valor);
    this.validarMonto();
  }

  actualizarMonto(evento: Event) {
    const valor = parseFloat((evento.target as HTMLInputElement).value);
    this.monto.set(isNaN(valor) ? null : valor);
    this.validarMonto();
  }

  validarMonto() {
    this.error.set(null);
    const m = this.monto();

    if (m !== null && m <= 0) {
      this.error.set('El monto debe ser mayor a cero.');
      return;
    }

    if (this.tipo() === 'Gasto' && m !== null && m > this.saldoActual()) {
      this.error.set('Saldo insuficiente para realizar el gasto.');
    }
  }

  esInvalido(): boolean {
    const m = this.monto();
    return m === null || m <= 0 || this.error() !== null;
  }

  registrarMovimiento() {
    if (this.esInvalido()) return;

    this.movimientoValido.emit({
      tipo: this.tipo(),
      monto: this.monto()!
    });

    
    this.monto.set(null);
    this.error.set(null);
  }
}