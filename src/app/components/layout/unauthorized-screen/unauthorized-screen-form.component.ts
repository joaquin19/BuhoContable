import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized-screen-form',
  templateUrl: './unauthorized-screen-form.component.html',
  styleUrls: ['./unauthorized-screen-form.component.scss']
})
export class UnauthorizedScreenFormComponent implements OnInit {

  public pageRedirect: string;

  constructor() {
    this.pageRedirect = 'dashboard';
  }

  ngOnInit(): void {
  }

}
