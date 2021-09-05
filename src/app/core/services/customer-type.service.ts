import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsConstants, ProjectSettings } from '../constants';
import { CustomerType } from '../models/customer-type';

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {

  private endpointCustomerType: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointCustomerType = this.endPoints.getApiCustomerType;
  }

  getCustomerTypes() {
    const endpoint = this.settings.generateEndpoint(this.endpointCustomerType);
    return this.http.get<CustomerType[]>(`${endpoint}/GetCustomerTypes`);
  }
}
