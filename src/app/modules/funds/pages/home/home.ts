import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  /** Cifras mock para la portada; luego se enlazan al state. */
  protected readonly mockBalance = 500_000;
  protected readonly mockPositions = 2;
  protected readonly mockFundsCount = 5;
}
