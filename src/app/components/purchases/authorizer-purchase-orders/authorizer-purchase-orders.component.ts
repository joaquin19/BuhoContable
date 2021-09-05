import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorizer-purchase-orders',
  templateUrl: './authorizer-purchase-orders.component.html',
  styleUrls: ['./authorizer-purchase-orders.component.scss']
})
export class AuthorizerPurchaseOrdersComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Autorización de Órdenes de Compra';
  }

  ngOnInit(): void {
  }

}
