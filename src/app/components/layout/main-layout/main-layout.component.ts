import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public collapseShow: string;
  public screenContent: string;
  public screenHeight: any;
  public screenWidth: any;

  constructor(
  ) {
    this.getScreenSize();
  }

  ngOnInit(): void {
  }

  toggleSidebar(event) {
    let opened: boolean;
    opened = event.opened;

    if (opened) {
      this.collapseShow = 'col-xl-2 col-lg-2 col-md-3 col-sm-12 bg-light sidebar collapse show';
      this.screenContent = 'col-xl-10 col-lg-10 col-md-9 col-sm-12 ml-sm-auto px-md-3 pb-3';
    } else {
      this.collapseShow = 'bg-light sidebar collapse';
      this.screenContent = 'col-xl-12 col-lg-12 col-md-12 col-sm-12 ml-sm-auto px-md-3 pb-3';
    }
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    if (this.screenWidth <= 768) {
      this.collapseShow = 'col-xl-2 col-lg-2 col-md-3 col-sm-12 bg-light sidebar collapse';
      this.screenContent = 'col-xl-12 col-lg-12 col-md-12 col-sm-12 ml-sm-auto px-md-3 pb-3';
    }
    else {
      this.collapseShow = 'col-xl-2 col-lg-2 col-md-3 col-sm-12 bg-light sidebar collapse show';
      this.screenContent = 'col-xl-10 col-lg-10 col-md-9 col-sm-12 ml-sm-auto px-md-3 pb-3';
    }
  }

}
