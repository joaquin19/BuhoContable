import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-invoice',
  templateUrl: './pre-invoice.component.html',
  styleUrls: ['./pre-invoice.component.scss']
})
export class PreInvoiceComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Lista de Pre-Facturas';
  }

  ngOnInit(): void {
  }

}
