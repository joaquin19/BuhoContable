import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-banks',
  templateUrl: './accounts-banks.component.html',
  styleUrls: ['./accounts-banks.component.scss']
})
export class AccountsBanksComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Cuentas Bancarias';
  }

  ngOnInit(): void {
  }

}
