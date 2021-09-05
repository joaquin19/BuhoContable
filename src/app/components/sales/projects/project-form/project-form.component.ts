import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import * as moment from 'moment';

import { Action } from '@app/core/enums';
import { AlertMessageService, SessionService, ProjectsService, CustomerService, ProjectCustomerService } from '@app/core/services';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  @Input() action: Action;
  @Input() item: any;
  @Output() saveItem = new EventEmitter();

  @ViewChild('formProject', { static: false })
  public formProject: NgForm;
  @ViewChild('customerObj', { static: false })
  public customerObj: DropDownListComponent;

  public listCustomers: any;
  public listProjectCustomers: any;
  public submitted: boolean;
  public titleHeader: string;
  public project: any;
  public startDate: NgbDateStruct;
  public endDate: NgbDateStruct;
  public currentUser: any;

  constructor(
    private alertMessageService: AlertMessageService,
    private projectService: ProjectsService,
    private projectCustomerService: ProjectCustomerService,
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private customerService: CustomerService,
    private calendar: NgbCalendar,
  ) {
    this.submitted = false;
    this.titleHeader = '';
    this.project = {
      id: 0,
      name: '',
      startDate: null,
      endDate: null,
      createBy: '',
      customerId: null
    };
    this.listCustomers = [];
    this.startDate = this.calendar.getToday();
    this.endDate = this.calendar.getToday();
  }

  ngOnInit(): void {
    this.currentUser = this.sessionService.userProfile();
    this.showForm();
  }

  getCustomers() {
    this.spinner.show();
    this.customerService.getCustomer().subscribe(
      data => {
        this.listCustomers = data;
        if (this.action === Action.Edit) {
          this.getProjectCustomers(this.project.id);
        }
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  getProjectCustomers(projectId) {
    this.spinner.show();
    this.projectCustomerService.getProjectCustomers(projectId).subscribe(
      data => {
        this.listProjectCustomers = data;
        this.customerObj.value = this.action === Action.Edit ? this.listProjectCustomers[0].customerId : null;
        this.spinner.hide();
      },
      error => {
        this.alertMessageService.errorMessage(error.message);
      });
  }

  filteringCustomer: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('name', 'contains', e.text, true, true) : query;
    e.updateData(this.listCustomers, query);
  }

  showForm() {
    switch (this.action) {
      case Action.Create:
        this.titleHeader = 'Agregar Proyecto';
        this.project = {
          id: 0,
          name: '',
          startDate: null,
          endDate: null,
          createBy: '',
          customerId: null
        };
        break;
      case Action.Edit:
        this.titleHeader = 'Editar Proyecto';
        this.project = {
          id: this.item.id,
          name: this.item.name,
          startDate: this.item.startDate,
          endDate: this.item.endDate,
          createBy: this.item.createdBy
        };

        const [dayStart, monthStart, yearStart] = moment(this.project.startDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY').split('-');
        const [dayEnd, monthEnd, yearEnd] = moment(this.project.endDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY').split('-');
        const objStartDate = { day: parseInt(dayStart, 0), month: parseInt(monthStart, 0), year: parseInt(yearStart, 0) };
        const objEndDate = { day: parseInt(dayEnd, 0), month: parseInt(monthEnd, 0), year: parseInt(yearEnd, 0) };
        this.startDate = objStartDate;
        this.endDate = objEndDate;
    }
    this.getCustomers();
  }

  saveForm() {
    this.submitted = true;

    if (this.formProject.invalid) {
      return;
    }
    const projectSave: any = {};

    projectSave.id = this.project.id;
    projectSave.name = this.project.name;
    projectSave.startDate =
      moment(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    projectSave.endDate =
      moment(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    projectSave.createBy = this.currentUser.userName;
    projectSave.detail = [{ customerId: this.project.customerId }];

    this.spinner.show();
    switch (this.action) {
      case Action.Create:
        this.projectService.saveProjects(projectSave).subscribe(data => {
          this.alertMessageService.successMessage('Proyecto guardado correctamente.');
          this.spinner.hide();
          this.saveItem.emit(true);
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
      case Action.Edit:
        this.projectService.updateProjects(projectSave).subscribe(data => {
          this.alertMessageService.successMessage('Proyecto editado correctamente.');
          this.spinner.hide();
          this.saveItem.emit(true);
        }, error => {
          this.alertMessageService.errorMessage(error.message);
        });
        break;
    }
  }

  dateSelectStart() {
    const startDate = moment(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`, 'YYYY-MM-DD');
    const endDate = moment(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`, 'YYYY-MM-DD');

    if (startDate > endDate) {
      this.startDate = this.calendar.getToday();
      this.alertMessageService.warningMessage(`La Fecha de Inicio debe ser menor o igual a la Fecha de Fin.`);
    }
  }

  dateSelectEnd() {
    const startDate = moment(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`, 'YYYY-MM-DD');
    const endDate = moment(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`, 'YYYY-MM-DD');

    if (endDate < startDate) {
      this.endDate = this.calendar.getToday();
      this.alertMessageService.warningMessage(`La Fecha de Fin debe ser mayor o igual a la Fecha de Inicio.`);
    }
  }


}
