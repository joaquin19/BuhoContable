import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reconciliation',
  templateUrl: './reconciliation.component.html',
  styleUrls: ['./reconciliation.component.scss']
})
export class ReconciliationComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Conciliaciones';
  }

  ngOnInit(): void {
  }

}
