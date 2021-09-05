import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-pediments',
  templateUrl: './import-pediments.component.html',
  styleUrls: ['./import-pediments.component.scss']
})
export class ImportPedimentsComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Pedimentos de Importación';
  }

  ngOnInit(): void {
  }

}
