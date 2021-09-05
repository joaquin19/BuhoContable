import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertMessageService, ProfileSystemService, MenuService, SessionService } from '@app/core/services';
import { Action } from '@app/core/enums';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profiles-form',
  templateUrl: './profiles-form.component.html',
  styleUrls: ['./profiles-form.component.scss']
})
export class ProfilesFormComponent implements OnInit {

  @ViewChild('formProfile', { static: false })
  public formProfile: NgForm;

  public titleHeader: string;
  public listHeaders: any;
  public listMenuAll: any;
  public listItems: any;
  public listMenu: any;
  public profile: any;
  public maxLengthDescription: number;
  public submitted: boolean;
  public pageRedirect: string;
  public actionForm: Action;
  public currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertMessageService: AlertMessageService,
    private profileSystemService: ProfileSystemService,
    private menuService: MenuService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.titleHeader = '';
    this.listHeaders = [];
    this.listMenuAll = [];
    this.listItems = [];
    this.listMenu = [];
    this.profile = {
      name: '',
      description: ''
    };
    this.actionForm = Action.None;
    this.maxLengthDescription = 200;
    this.submitted = false;
    this.pageRedirect = '/settings/profiles';
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();

    this.listHeaders = [
      { name: 'Menú', colspan: 1 },
      { name: 'Permisos', colspan: 4 }
    ];

    this.showForm();
  }

  showForm() {
    this.route.params.subscribe((params) => {
      if (this.route.snapshot.url.length === 1 || this.route.snapshot.url.length === 2) {
        switch (this.route.snapshot.url[0].path) {
          case 'addProfile':
            this.titleHeader = 'Agregar Perfil';
            this.profile = {
              id: 0,
              name: '',
              description: ''
            };
            this.actionForm = Action.Create;
            this.getMenuAll(0);
            break;
          case 'editProfile':
            this.titleHeader = 'Editar Perfil';
            this.actionForm = Action.Edit;
            this.getProfileSystemById(params.id);
            break;
          default:
            this.router.navigate([this.pageRedirect]);
            break;
        }
      } else {
        this.router.navigate([this.pageRedirect]);
      }
    });
  }

  getProfileSystemById(profileId: number) {
    this.spinner.show();
    this.profileSystemService.getProfileSystemById(profileId).subscribe(
      data => {
        this.profile = data;
        this.getMenuAll(profileId);
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
        this.router.navigate([this.pageRedirect]);
      });
  }

  getMenuAll(profileId: number) {
    this.spinner.show();

    this.menuService.getMenu().subscribe(
      data => {
        this.listMenuAll = data;

        this.listMenuAll.forEach(element => {
          this.listItems.push({
            id: element.id,
            moduleId: element.moduleId,
            parentMenuId: element.parentMenuId,
            displayName: element.displayName,
            sortOrder: element.sortOrder,
            sortOrderParent: element.sortOrder,
            create: false,
            update: false,
            delete: false,
            readOnly: false
          });
        });

        this.listMenu.push(this.listItems.filter(o => o.id === 1)[0]);
        const listParentsAll = this.listItems.filter(o => o.parentMenuId === null && o.id !== 1);
        listParentsAll.sort((a, b) => a[`sortOrder`] - b[`sortOrder`]);
        listParentsAll.forEach(parent => {
          this.listMenu.push(parent);
          const listChildrenAll = this.listItems.filter(o => o.parentMenuId === parent.id);
          listChildrenAll.sort((a, b) => a[`sortOrder`] - b[`sortOrder`]);
          listChildrenAll.forEach(children => {
            children.sortOrderParent = parent.sortOrderParent;
            this.listMenu.push(children);
          });
        });

        switch (this.actionForm) {
          case Action.Edit:

            this.menuService.getMenuByProfileSystemId(profileId).subscribe(
              menu => {
                menu.forEach(itemMenu => {
                  const item = this.listMenu.filter(o => o.id === itemMenu.menuId)[0];
                  if (item.parentMenuId !== null) {
                    item.create = itemMenu.create;
                    item.update = itemMenu.update;
                    item.delete = itemMenu.delete;
                    item.readOnly = itemMenu.readOnly;
                  }
                });

                const listParents = this.listMenu.filter(o => o.parentMenuId === null && o.id !== 1);

                listParents.forEach(parent => {
                  const listChildren = this.listMenu.filter(o => o.parentMenuId === parent.id);
                  const countChildrens = listChildren.length;
                  const listTypeCheck = ['create', 'update', 'delete', 'readOnly'];
                  const checked = true;
                  listTypeCheck.forEach(typeCheck => {
                    const listChildrenActives = listChildren.filter(o => o[`${typeCheck}`] === checked);
                    const countChildrensActives = listChildrenActives.length;
                    if (countChildrensActives === countChildrens) {
                      parent[`${typeCheck}`] = checked;
                    }
                  });
                });
              },
              error => {
                this.alertMessageService.errorMessage(error.message);
                this.router.navigate([this.pageRedirect]);
              });

            break;
        }
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
        this.router.navigate([this.pageRedirect]);
      });
  }

  selectItem(item, event) {
    const typeCheck = event.target.id.split('_')[0];
    const checked = event.target.checked;
    item[`${typeCheck}`] = checked;

    if (checked) {
      if (item.parentMenuId === null) {
        const listChildren = this.listItems.filter(o => o.parentMenuId === item.id);
        listChildren.forEach(element => {
          element[`${typeCheck}`] = checked;
        });

        if (typeCheck === 'readOnly') {
          listChildren.forEach(element => {
            element.create = !checked;
            element.update = !checked;
            element.delete = !checked;
          });
          item.create = !checked;
          item.update = !checked;
          item.delete = !checked;
        } else {
          listChildren.forEach(element => {
            element.readOnly = !checked;
          });
          item.readOnly = !checked;
        }
      } else {
        const parent = this.listItems.filter(o => o.id === item.parentMenuId)[0];

        if (typeCheck === 'readOnly') {
          item.create = !checked;
          item.update = !checked;
          item.delete = !checked;
          parent.create = !checked;
          parent.update = !checked;
          parent.delete = !checked;
        } else {
          item.readOnly = !checked;
          parent.readOnly = !checked;
        }

        const listChildren = this.listItems.filter(o => o.parentMenuId === parent.id);
        const countChildrens = listChildren.length;
        const listChildrenActives = listChildren.filter(o => o[`${typeCheck}`] === true);
        const countChildrensActives = listChildrenActives.length;
        if (countChildrensActives === countChildrens) {
          parent[`${typeCheck}`] = checked;
        }
      }
    } else {
      if (item.parentMenuId === null) {
        const listChildren = this.listItems.filter(o => o.parentMenuId === item.id);
        listChildren.forEach(element => {
          element[`${typeCheck}`] = checked;
        });
      } else {
        const parent = this.listItems.filter(o => o.id === item.parentMenuId)[0];
        parent[`${typeCheck}`] = checked;
      }
    }
  }

  saveForm() {
    this.submitted = true;

    if (this.formProfile.invalid) {
      return;
    }

    const profileSave: any = {};
    const menuArray = [];
    const menuDefault = this.listItems.filter(o => o.id === 1)[0];

    menuArray.push({
      menuId: menuDefault.id,
      create: false,
      update: false,
      delete: false,
      readOnly: true
    });

    const listParents = this.listItems.filter(o => o.parentMenuId === null && o.id !== 1);
    listParents.forEach(parent => {
      const listChildrens = this.listItems.filter(o => o.parentMenuId === parent.id);
      listChildrens.forEach(children => {
        if (children.create === false && children.update === false
          && children.delete === false && children.readOnly === false) {
          return;
        } else {

          if (!menuArray.some(o => o.menuId === parent.id)) {
            menuArray.push({
              menuId: parent.id,
              create: false,
              update: false,
              delete: false,
              readOnly: true
            });
          }

          menuArray.push({
            menuId: children.id,
            create: children.create,
            update: children.update,
            delete: children.delete,
            readOnly: children.readOnly
          });

        }
      });
    });

    if (menuArray.length <= 1) {
      this.alertMessageService.warningMessage(`Debe seleccionar al menos una opción de permisos del menú.`);
      return;
    }

    profileSave.id = this.profile.id;
    profileSave.name = this.profile.name.trim();
    profileSave.description = this.profile.description.trim();
    profileSave.menuItems = menuArray;
    profileSave.createBy = this.currentUser.userName;

    this.spinner.show();
    switch (this.actionForm) {
      case Action.Create:
        this.profileSystemService.saveProfilesSystem(profileSave).subscribe(data => {
          this.alertMessageService.successMessage('Perfil guardado correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
      case Action.Edit:
        this.profileSystemService.updateProfileSystem(profileSave).subscribe(data => {
          this.alertMessageService.successMessage('Perfil editado correctamente.');
          this.router.navigate([this.pageRedirect]);
          this.spinner.hide();
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
    }
  }

}
