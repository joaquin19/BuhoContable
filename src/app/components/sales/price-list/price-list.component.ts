import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Lista de Precios';
  }

  ngOnInit(): void {
  }

}
