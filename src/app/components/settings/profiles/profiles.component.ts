import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Perfiles';
  }

  ngOnInit(): void {
  }

}
