import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchandise-reception',
  templateUrl: './merchandise-reception.component.html',
  styleUrls: ['./merchandise-reception.component.scss']
})
export class MerchandiseReceptionComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Listado de Recepción de Mercancía';
  }

  ngOnInit(): void {
  }

}
