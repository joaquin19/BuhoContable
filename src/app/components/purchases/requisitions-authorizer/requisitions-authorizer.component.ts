import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requisitions-authorizer',
  templateUrl: './requisitions-authorizer.component.html',
  styleUrls: ['./requisitions-authorizer.component.scss']
})
export class RequisitionsAuthorizerComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Autorización de Requisiciones';
  }

  ngOnInit(): void {
  }

}
