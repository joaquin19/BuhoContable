import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public titleHeader: string;

  constructor() {
    this.titleHeader = 'Proyectos';
  }

  ngOnInit(): void {
  }

}
