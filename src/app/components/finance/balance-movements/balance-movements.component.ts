import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance-movements',
  templateUrl: './balance-movements.component.html',
  styleUrls: ['./balance-movements.component.scss']
})
export class BalanceMovementsComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Movimiento de Saldos';
  }

  ngOnInit(): void {
  }

}
