import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter<any>();

  public opened: boolean;
  public screenHeight: any;
  public screenWidth: any;

  constructor() {
    this.getScreenSize();
  }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.opened = !this.opened;

    this.toggle.emit(
      {
        opened: this.opened
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    if (this.screenWidth <= 768) {
      this.opened = false;
    }
    else {
      this.opened = true;
    }
  }

}
