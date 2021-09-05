import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertMessageService, MenuService, SessionService } from '@app/core/services';
import { TreeViewComponent, NodeSelectEventArgs } from '@syncfusion/ej2-angular-navigations';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('treeviewMenu')
  public treeviewMenu: TreeViewComponent;

  public listMenu: any;
  public data: any;
  public fields: any;
  public listNav: any;
  public currentUser: any;

  constructor(
    private router: Router,
    private alertMessageService: AlertMessageService,
    private menuService: MenuService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.listMenu = [];
    this.data = [];
    this.fields = {};
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();

    this.getMenuByUser(this.currentUser.userName);
  }

  getMenuByUser(user) {
    this.spinner.show();

    this.menuService.getMenuByUser(user).subscribe(
      data => {
        this.listMenu = data;
        this.setMenu();
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  setMenu() {
    const listParents = this.listMenu.filter(o => o.parentMenuId === null);
    listParents.sort((a, b) => a[`sortOrder`] - b[`sortOrder`]);

    listParents.forEach(parent => {
      const nodeChildItems: any = [];
      const iconClass = 'icon-menu icon-';

      const listChildrens = this.listMenu.filter(o => o.parentMenuId === parent.menuId);
      listChildrens.sort((a, b) => a[`sortOrder`] - b[`sortOrder`]);

      listChildrens.forEach(children => {
        nodeChildItems.push({
          nodeId: children.id,
          nodeText: `${parent.sortOrder}.${children.sortOrder} - ${children.menuDisplayName}`,
          iconCss: `${iconClass}${children.iconName}`,
          url: children.pageURL
        });
      });

      if (parent.menuId === 1) {
        this.data.push({
          nodeId: parent.id,
          nodeText: `${parent.menuDisplayName}`,
          iconCss: `${iconClass}${parent.iconName}`,
          url: parent.pageURL,
          nodeChild: nodeChildItems
        });
      }
      else {
        this.data.push({
          nodeId: parent.id,
          nodeText: `${parent.sortOrder} - ${parent.menuDisplayName}`,
          iconCss: `${iconClass}${parent.iconName}`,
          url: parent.pageURL,
          nodeChild: nodeChildItems
        });
      }

    });

    this.fields = {
      dataSource: this.data,
      id: 'nodeId',
      text: 'nodeText',
      child: 'nodeChild',
      iconCss: 'iconCss'
    };
  }

  public loadRoutingContent(args: NodeSelectEventArgs): void {
    const data: any = this.treeviewMenu.getTreeData(args.node);
    const routeUri = data[0].url;
    if (routeUri !== '') {
      const routerLink: string = routeUri;
      this.router.navigate([routerLink]);
    }
  }

}
