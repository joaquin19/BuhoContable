import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Productos';
  }

  ngOnInit(): void {
  }

}
