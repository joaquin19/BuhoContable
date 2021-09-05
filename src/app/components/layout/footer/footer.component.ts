import { Component, OnInit } from '@angular/core';
import { ProjectSettings } from '@app/core/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public infoVersion: string;
  public developedBy: string;

  constructor(
    private settings: ProjectSettings
  ) {
    this.infoVersion = this.settings.infoVersion();
    this.developedBy = this.settings.developedBy();
  }

  ngOnInit(): void {
  }

}
