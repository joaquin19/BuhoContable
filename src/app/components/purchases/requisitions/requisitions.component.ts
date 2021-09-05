import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requisitions',
  templateUrl: './requisitions.component.html',
  styleUrls: ['./requisitions.component.scss']
})
export class RequisitionsComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Requisiciones';
  }

  ngOnInit(): void {
  }

}
