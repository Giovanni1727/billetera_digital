import { Component, signal } from '@angular/core';
import { NuevoMovimiento } from '../nuevo-movimiento/nuevo-movimiento';
import { Movimiento } from '../../modelos/movimiento';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-billetera',
  imports: [NuevoMovimiento, CurrencyPipe, NgClass],
  templateUrl: './billetera.html',
  styleUrl: './billetera.css'
})
export class Billetera {
  saldo = signal<number>(250.00);
  historial = signal<Movimiento[]>([]);

  procesarMovimiento(movimiento: Movimiento) {
   
    if (movimiento.tipo === 'Recarga') {
      this.saldo.update(s => s + movimiento.monto);
    } else if (movimiento.tipo === 'Gasto') {
      this.saldo.update(s => s - movimiento.monto);
    }

   
    this.historial.update(lista => [movimiento, ...lista]);
  }
}