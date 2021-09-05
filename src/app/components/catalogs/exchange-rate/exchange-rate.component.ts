import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Tipo de Cambio';
  }

  ngOnInit(): void {
  }

}
