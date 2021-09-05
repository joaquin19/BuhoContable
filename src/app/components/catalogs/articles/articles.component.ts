import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Artículos';
  }

  ngOnInit(): void {
  }

}
