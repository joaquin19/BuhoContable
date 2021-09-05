import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remissions',
  templateUrl: './remissions.component.html',
  styleUrls: ['./remissions.component.scss']
})
export class RemissionsComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Remisiones';
  }

  ngOnInit(): void {
  }

}
