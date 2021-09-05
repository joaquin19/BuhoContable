import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorizer-price-list',
  templateUrl: './authorizer-price-list.component.html',
  styleUrls: ['./authorizer-price-list.component.scss']
})
export class AuthorizerPriceListComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Autorización de Lista de Precios';
  }

  ngOnInit(): void {
  }

}
