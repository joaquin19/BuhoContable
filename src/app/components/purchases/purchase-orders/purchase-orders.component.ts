import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Órdenes de Compra';
  }

  ngOnInit(): void {
  }

}
