import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Inicio';
  }

  ngOnInit(): void {
  }

}
