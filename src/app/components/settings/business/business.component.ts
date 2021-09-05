import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Empresas';
  }

  ngOnInit(): void {
  }

}
