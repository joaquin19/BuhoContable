import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-payable',
  templateUrl: './accounts-payable.component.html',
  styleUrls: ['./accounts-payable.component.scss']
})
export class AccountsPayableComponent implements OnInit {

  public titleHeader: string;

  constructor() { }

  ngOnInit(): void {
    this.titleHeader = 'Cuentas por Pagar';
  }

}
