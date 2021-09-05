import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Clientes';
  }

  ngOnInit(): void {
  }

}
