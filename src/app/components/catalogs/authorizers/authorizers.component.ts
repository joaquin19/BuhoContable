import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorizers',
  templateUrl: './authorizers.component.html',
  styleUrls: ['./authorizers.component.scss']
})
export class AuthorizersComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Autorizadores';
  }

  ngOnInit(): void {
  }

}
