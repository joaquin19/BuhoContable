import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertMessageService, ProfileSystemService, UserSystemService, SessionService } from '@app/core/services';
import { Action } from '@app/core/enums';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { NgxSpinnerService } from 'ngx-spinner';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('formUser', { static: false })
  public formUser: NgForm;
  @ViewChild('profileObj', { static: false })
  public profileObj: DropDownListComponent;

  public user: any;
  public listProfiles: any;
  public submitted: boolean;
  public editUser: boolean;
  public currentUser: any;

  constructor(
    private alertMessageService: AlertMessageService,
    private profileSystemService: ProfileSystemService,
    private userSystemService: UserSystemService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService
  ) {
    this.user = {
      id: 0,
      profileId: null,
      profileName: '',
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      userName: '',
      active: false
    };
    this.listProfiles = [];
    this.submitted = false;
    this.editUser = false;
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.showForm();
  }

  showForm() {
    switch (this.action) {
      case Action.Create:
        this.user = {
          id: 0,
          profileId: null,
          profileName: '',
          firstName: '',
          lastName: '',
          fullName: '',
          email: '',
          userName: '',
          active: false
        };

        this.editUser = false;

        break;
      case Action.Edit:
        this.user = {
          id: this.item.id,
          profileId: this.item.profileId,
          profileName: this.item.profileName,
          firstName: this.item.firstName,
          lastName: this.item.lastName,
          fullName: this.item.fullName,
          email: this.item.email,
          userName: this.item.userName,
          active: this.item.active
        };

        this.editUser = true;

        break;
    }

    this.getProfilesSystem();
  }

  getProfilesSystem() {
    this.spinner.show();
    this.profileSystemService.getProfilesSystem().subscribe(
      data => {
        this.listProfiles = data;
        this.profileObj.value = this.action === Action.Edit ? this.user.profileId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringProfile: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listProfiles, query);
  }

  saveForm() {
    this.submitted = true;

    if (this.formUser.invalid) {
      return;
    }

    const userSave: any = {};

    userSave.id = this.user.id;
    userSave.profileId = this.user.profileId;
    userSave.firstName = this.user.firstName.trim();
    userSave.lastName = this.user.lastName.trim();
    userSave.email = this.user.email.trim();
    userSave.createBy = this.currentUser.userName;

    this.spinner.show();
    switch (this.action) {
      case Action.Create:
        this.userSystemService.saveUserSystem(userSave).subscribe(data => {
          this.alertMessageService.successMessage('Usuario guardado correctamente.');
          this.spinner.hide();
          this.saveItem.emit(true);
        }, error => {
          this.alertMessageService.errorMessage(error.message);
          this.spinner.hide();
        });
        break;
      case Action.Edit:
        this.spinner.hide();
        this.userSystemService.updateUserSystem(userSave).subscribe(data => {
          this.alertMessageService.successMessage('Usuario editado correctamente.');
          this.spinner.hide();
          this.saveItem.emit(true);
        }, error => {
          this.alertMessageService.errorMessage(error.message);
          this.spinner.hide();
        });
        break;
    }
  }

  resetPassword() {
    this.spinner.show();
    const userSave: any = {};
    userSave.id = this.user.id;
    this.userSystemService.updateResetPassword(userSave).subscribe(data => {
      this.alertMessageService.successMessage('Contraseña reiniciada correctamente.');
      this.spinner.hide();
      this.saveItem.emit(true);
    }, error => {
      this.alertMessageService.errorMessage(error.message);
      this.spinner.hide();
    });
  }

}
