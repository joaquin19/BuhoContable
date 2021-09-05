import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-support',
  templateUrl: './sales-support.component.html',
  styleUrls: ['./sales-support.component.scss']
})
export class SalesSupportComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Soporte de Ventas';
  }

  ngOnInit(): void {
  }

}
