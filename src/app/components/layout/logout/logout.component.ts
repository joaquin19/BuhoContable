import { Component, OnInit } from '@angular/core';
import { LoginUser } from '@app/core/models';
import { SessionService } from '@app/core/services';
import { ItemModel } from '@syncfusion/ej2-splitbuttons';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  currentUser: LoginUser;
  items: ItemModel[] = [];

  constructor(
    private sessionService: SessionService
  ) {

  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.items = [
      {
        text: 'Salir',
        iconCss: 'icon icon-exit_to_app'
      }];
  }

  select(args: MenuEventArgs) {
    if (args.item.text === 'Salir') {
      this.logout();
    }
  }

  logout() {
    this.currentUser = new LoginUser();
    this.sessionService.doLogoutUser(false);
  }

}
