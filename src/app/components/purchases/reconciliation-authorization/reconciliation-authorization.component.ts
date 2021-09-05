import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reconciliation-authorization',
  templateUrl: './reconciliation-authorization.component.html',
  styleUrls: ['./reconciliation-authorization.component.scss']
})
export class ReconciliationAuthorizationComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Autorización de Conciliaciones';
  }

  ngOnInit(): void {
  }

}
